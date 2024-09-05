from flask import Flask, request, jsonify
from flask_cors import CORS  # Импортируем CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/proxy1', methods=['POST'])
def proxy1():
    # Получаем данные из запроса клиента
    token = request.json.get('token')
    user_id = request.json.get('userId')
    url = f'https://www.duolingo.com/2017-06-30/users/{user_id}?fields=fromLanguage,learningLanguage'
    
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.7",
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Referer": "https://www.duolingo.com/practice",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    }

    # Отправляем запрос к целевому API от имени клиента
    response = requests.get(url, headers=headers)

    # Возвращаем ответ от целевого API клиенту
    return jsonify(response.json()), response.status_code

@app.route('/proxy2', methods=['POST'])
def proxy2():
    # Получаем данные и заголовки из запроса клиента
    token = request.json.get('token')
    payload = request.json.get('payload')

    url = 'https://schools.duolingo.com/api/2/classrooms'
    
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.7",
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Referer": "https://www.duolingo.com/practice",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    }

    # Отправляем запрос к целевому API от имени клиента
    response = requests.post(url, json=payload, headers=headers)

    # Возвращаем ответ от целевого API клиенту
    return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(port=5000)
