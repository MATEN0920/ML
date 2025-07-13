import threading, webbrowser, pathlib, os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = pathlib.Path(__file__).parent.parent / 'viewer'
os.chdir(ROOT)
port = 8080

srv = ThreadingHTTPServer(('', port), SimpleHTTPRequestHandler)
thread = threading.Thread(target=srv.serve_forever, daemon=True)
thread.start()

print('[√] 서버 기동 → http://localhost:8080')
webbrowser.open(f'http://localhost:{port}')
input('[Enter] 키를 누르면 서버를 종료합니다…')
srv.shutdown()
