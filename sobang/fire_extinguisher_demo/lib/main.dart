import 'dart:io';
import 'dart:typed_data';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(FireExtinguisherApp());
}

class FireExtinguisherApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '소화기 탐지 미션',
      home: FireExtinguisherPage(),
    );
  }
}

class FireExtinguisherPage extends StatefulWidget {
  @override
  _FireExtinguisherPageState createState() => _FireExtinguisherPageState();
}

class _FireExtinguisherPageState extends State<FireExtinguisherPage> {
  File? _image;
  Uint8List? _webImage;
  String _resultMessage = '';

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      if (kIsWeb) {
        // Web일 때: Uint8List로 읽음
        var bytes = await pickedFile.readAsBytes();
        setState(() {
          _webImage = bytes;
          _resultMessage = '';
        });
        _uploadImageWeb(bytes, pickedFile.name);
      } else {
        // Desktop/mobile일 때: File로 읽음
        setState(() {
          _image = File(pickedFile.path);
          _resultMessage = '';
        });
        _uploadImage(_image!);
      }
    }
  }

  Future<void> _uploadImage(File imageFile) async {
    var uri = Uri.parse('http://172.16.35.200:5000/detect');
    var request = http.MultipartRequest('POST', uri)
      ..files.add(await http.MultipartFile.fromPath('image', imageFile.path));
    var response = await request.send();

    if (response.statusCode == 200) {
      var responseBody = await response.stream.bytesToString();
      var jsonResult = json.decode(responseBody);
      setState(() {
        _resultMessage = jsonResult['result'] == 'success'
            ? '소화기를 탐지했습니다!'
            : '소화기가 탐지되지 않았습니다.';
      });
    } else {
      setState(() {
        _resultMessage = '서버 오류: ${response.statusCode}';
      });
    }
  }

  // 웹용 업로드 함수
  Future<void> _uploadImageWeb(Uint8List bytes, String filename) async {
    var uri = Uri.parse('http://192.168.25.45:5000/detect');
    var request = http.MultipartRequest('POST', uri)
      ..files.add(
        http.MultipartFile.fromBytes('image', bytes, filename: filename),
      );
    var response = await request.send();

    if (response.statusCode == 200) {
      var responseBody = await response.stream.bytesToString();
      var jsonResult = json.decode(responseBody);
      setState(() {
        _resultMessage = jsonResult['result'] == 'success'
            ? '소화기를 탐지했습니다!'
            : '소화기가 탐지되지 않았습니다.';
      });
    } else {
      setState(() {
        _resultMessage = '서버 오류: ${response.statusCode}';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget imageWidget;
    if (kIsWeb) {
      imageWidget = _webImage != null
          ? Image.memory(_webImage!, width: 200)
          : Icon(Icons.image, size: 100, color: Colors.grey);
    } else {
      imageWidget = _image != null
          ? Image.file(_image!, width: 200)
          : Icon(Icons.image, size: 100, color: Colors.grey);
    }

    return Scaffold(
      appBar: AppBar(title: Text('소화기 탐지 미션')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            imageWidget,
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _pickImage,
              child: Text('이미지 업로드'),
            ),
            SizedBox(height: 20),
            Text(_resultMessage, style: TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }
}
