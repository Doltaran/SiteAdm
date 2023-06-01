from flask import redirect, url_for
from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, leave_room
import uuid
from flask import request

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = '34rgbb54yfds3t2FR3Fg'
socketio = SocketIO(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['JSON_AS_ASCII'] = False

def generate_room_id():
    return str(uuid.uuid4())

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/room/<room_id>', methods=['GET'])
def room(room_id):
    return render_template('room.html', room_id=room_id)

@app.route('/create_room', methods=['POST'])
def create_room():
    room_id = generate_room_id()
    return redirect(url_for('room', room_id=room_id))


@socketio.on('connect')
def handle_connect():
    client_ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')
    print(f'Client connected from IP: {client_ip}, User-Agent: {user_agent}')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('join')
def handle_join(data):
    room_id = data['room_id']
    join_room(room_id)
    print('Client joined room', room_id)

@socketio.on('leave')
def handle_leave(data):
    room_id = data['room_id']
    leave_room(room_id)
    print('Client left room', room_id)



if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
