from flask import Flask, send_from_directory, jsonify

app = Flask(__name__, template_folder='static', static_folder='static')


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route('/static/<path:path>')
def get_assets(path):
    return send_from_directory(app.static_folder, path)


@app.route("/api/example-todos", methods=['GET'])
def example_todos():
    return jsonify([
        {
            "text": "learn Python Flask",
            "done": False
        },
        {
            "text": "build a Python Flask app",
            "done": False
        }
    ])


if __name__ == '__main__':
    app.config.update(
        DEBUG=True,
        TEMPLATES_AUTO_RELOAD=True
    )
    app.run()
