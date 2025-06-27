from flask import Flask, render_template, request, redirect, session, url_for
from flask_mysqldb import MySQL
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os
import config

app = Flask(__name__)
app.config.from_object(config)

mysql = MySQL(app)

# File Upload Folder
app.config['UPLOAD_FOLDER'] = config.UPLOAD_FOLDER

# User Home
@app.route('/')
def index():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM courses")
    courses = cur.fetchall()
    return render_template('index.html', courses=courses)

# Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        mysql.connection.commit()
        return redirect('/login')
    return render_template('register.html')

# Login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password_input = request.form['password']

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cur.fetchone()

        if user and check_password_hash(user[3], password_input):
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            return redirect('/dashboard')
    return render_template('login.html')

# Dashboard
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect('/login')
    
    user_id = session['user_id']
    cur = mysql.connection.cursor()
    cur.execute("""
        SELECT c.title, c.pdf_path, c.session_link 
        FROM purchases p JOIN courses c ON p.course_id = c.id 
        WHERE p.user_id = %s
    """, (user_id,))
    purchased_courses = cur.fetchall()

    return render_template('dashboard.html', user=session['user_name'], purchased_courses=purchased_courses)

# Course Detail + Payment Placeholder
@app.route('/course/<int:course_id>')
def course_detail(course_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM courses WHERE id = %s", (course_id,))
    course = cur.fetchone()
    return render_template('course_detail.html', course=course)

# Admin Login (basic)
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        if request.form['username'] == 'admin' and request.form['password'] == 'admin123':
            session['admin'] = True
            return redirect('/admin/dashboard')
    return render_template('admin_login.html')

# Admin Dashboard (Upload Course)
@app.route('/admin/dashboard', methods=['GET', 'POST'])
def admin_dashboard():
    if 'admin' not in session:
        return redirect('/admin/login')

    if request.method == 'POST':
        title = request.form['title']
        desc = request.form['description']
        session_link = request.form['session_link']
        pdf = request.files['pdf']
        filename = secure_filename(pdf.filename)
        pdf.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO courses (title, description, pdf_path, session_link, price) VALUES (%s, %s, %s, %s, 200)", 
                    (title, desc, filename, session_link))
        mysql.connection.commit()
    return render_template('admin_dashboard.html')

@app.route('/pay/<int:course_id>', methods=['POST'])
def pay(course_id):
    if 'user_id' not in session:
        return redirect('/login')

    user_id = session['user_id']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM courses WHERE id = %s", (course_id,))
    course = cur.fetchone()

    if course:
        amount = course[5] * 100  # in paise
        order = razorpay_client.order.create(dict(
            amount=amount,
            currency='INR',
            payment_capture=1
        ))

        session['course_id'] = course_id
        session['order_id'] = order['id']

        return render_template('payment_page.html',
                               course=course,
                               key_id=config.RAZORPAY_KEY_ID,
                               order_id=order['id'],
                               amount=amount,
                               user_name=session['user_name'],
                               user_email="testuser@example.com")
    else:
        return "Course not found"

@app.route('/payment_success')
def payment_success():
    if 'user_id' not in session or 'course_id' not in session:
        return redirect('/dashboard')

    user_id = session['user_id']
    course_id = session['course_id']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO purchases (user_id, course_id, payment_status) VALUES (%s, %s, 'Success')",
                (user_id, course_id))
    mysql.connection.commit()

    # Clear session temp data
    session.pop('order_id', None)
    session.pop('course_id', None)

    return redirect('/dashboard')

@app.route('/test-db')
def test_db():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SHOW TABLES;")
        tables = cur.fetchall()
        return f"✅ Connected to DB! Tables: {tables}"
    except Exception as e:
        return f"❌ DB Error: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True)
