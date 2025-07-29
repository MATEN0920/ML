# 1단계: React 프론트엔드 빌드
FROM node:18 as frontend

WORKDIR /app/frontend
COPY frontend/ ./
RUN npm install
RUN npm run build


# 2단계: Flask 백엔드 실행 + 정적 파일 포함
FROM python:3.11-slim

# 작업 디렉토리
WORKDIR /app

# 백엔드 코드 복사
COPY backend/ ./backend/

# React build 결과 복사
COPY --from=frontend /app/frontend/build ./frontend/build

# requirements.txt 복사 및 설치
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# 포트 열기 (예: 5050)
ENV PORT=5050
EXPOSE 5050

# 실행 명령
CMD ["python", "backend/app.py"]