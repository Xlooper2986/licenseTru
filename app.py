from flask import Flask, request, jsonify, render_template
import datetime

app = Flask(__name__)
logs = []

SECRET_KEY = "b7d1f8a3-59c9-4d4c-a02b-49b77e6d8f51"  # رمز سخت

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/log", methods=["POST"])
def log():
    data = request.get_json()
    data["server_time"] = datetime.datetime.utcnow().isoformat()+"Z"
    logs.append(data)
    return jsonify({"ok": True})

@app.route("/secret")
def secret():
    key = request.args.get("key")
    if key != SECRET_KEY:
        return "❌ Access denied"
    return jsonify({"logs": logs})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
