from http.server import SimpleHTTPRequestHandler,HTTPServer
from pathlib import Path
import sys
import os
import subprocess
import argparse
import json

PORT_NUMBER = 8080
index_dir = 'nodanger/build'


class RequestHandler(SimpleHTTPRequestHandler):

    def __init__(self, request, client_address, server):
        # stupid cross-platform way to change directory to nodanger/src/build
        web_dir = os.getcwd()
        for dir in ('nodanger','build'):
            web_dir = os.path.join(web_dir, dir)
        self.route_mapping = {
            '/': self.get_homepage,
            '/getdata': self.get_data,
            '/senddata': self.send_data
        }

        SimpleHTTPRequestHandler.__init__(
            self, request, client_address, server, directory=web_dir)

    def do_GET(self):

        # runs if path matches file in build directory
        request_path = Path(os.path.join(self.directory, self.path[1:]))

        if request_path.is_file():
            print('GET file %s' % self.path)
            self.send_response(200)
            self.end_headers()
            with open(str(request_path), 'rb') as file:
                self.wfile.write(file.read())

        else:

            try:
                api_fn = self.route_mapping[self.path.lower()]
                return api_fn()

            except:
                print('no api fn found for %s' % self.path)
                # print('bad request to {}'.format(self.path).encode('utf-8'))
                # self.send_response(200)
                # self.send_header('Content-type','text/html')
                # self.end_headers()
                # self.wfile.write('Bad url {}'.format(self.path).encode('utf-8'))

    def do_POST(self):

        body_size = int(self.headers['Content-Length'])
        body = self.rfile.read(body_size)
        js = json.loads(body)

        try:
            api_fn = self.route_mapping[self.path.lower()]
            return api_fn(js)

        except:
            pass
            # print('bad request to {}'.format(self.path).encode('utf-8'))
            # self.send_response(200)
            # self.send_header('Content-type','text/html')
            # self.end_headers()
            # self.wfile.write('Bad url {}'.format(self.path).encode('utf-8'))


    def get_homepage(self):
        """
            route: /
            returns: homepage
        """
        self.path = '/index.html'
        return self.do_GET()


    def get_data(self):
        """
            route: getdata
            returns: some data
            called from App.js (componentDidMount)
        """
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        myjson = {'some key': 'some val'}
        self.wfile.write(json.dumps(myjson).encode('utf-8'))
        return

    def send_data(self, data):
        """
            route: senddata
            returns: success message that we received data
            called from App.js (componentDidMount)
        """
        self.wfile.write(json.dumps({'data_read': data}).encode('utf-8'))
        return

def start_server():

    try:
        server = HTTPServer(('', PORT_NUMBER), RequestHandler)
        print('Started httpserver on http://localhost:%d' % PORT_NUMBER)

        server.serve_forever()

    except KeyboardInterrupt:
        print('^C received, shutting down the web server')
        server.socket.close()

def update():
    print('spawning child process to update react app:')
    cProcess = subprocess.run("cd nodanger/src && npm update", shell=True)
    print('completed with:\n\texit code {}'.format(cProcess.returncode))

def build():
    print('spawning child process to build react app:')
    cProcess = subprocess.run("cd nodanger/src && npm run build", shell=True)
    print('completed with:\n\texit code {}'.format(cProcess.returncode))


if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='Start server for hosting application and contacting database')
    parser.add_argument(
        '-update',
        action = 'store_true',
        help='runs \"npm update\" for react app via child process',
    )
    parser.add_argument(
        '-build',
        action = 'store_true',
        help='build react app via child process (else use current build)',
    )
    args = parser.parse_args()

    if args.update:
        update()
    if args.build:
        build()

    start_server()
