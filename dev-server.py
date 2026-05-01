"""
dev-server.py — Cache-Control: no-store ヘッダー付きローカル開発サーバー
python -m http.server は Cache-Control ヘッダーを返さないため、ブラウザが HTML・JS を
キャッシュし、Babel トランスパイル結果が古くなる問題を防ぐ。

Usage:
  py dev-server.py <port> <directory>
  例: py dev-server.py 8092 C:/Users/kfuru/.secretary
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys, os

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        pass  # ログ抑制

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8092
    directory = sys.argv[2] if len(sys.argv) > 2 else '.'
    os.chdir(directory)
    print(f'Serving {directory} on :{port} [Cache-Control: no-store]', flush=True)
    HTTPServer(('', port), NoCacheHandler).serve_forever()
