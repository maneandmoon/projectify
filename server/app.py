#!/usr/bin/env python3

# Standard library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Project, Interest, UserInterest, ProjectInterest, Comment
from sqlalchemy.exc import IntegrityError

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        return make_response([user.to_dict() for user in users], 200)

    elif request.method == 'POST':
        data = request.get_json()

        # Check if username already exists
        existing_user = User.query.filter_by(username=data.get("username")).first()
        if existing_user:
            return make_response(({"error": "Username already exists"}), 400)

        # Check if email already exists
        existing_email = User.query.filter_by(email=data.get("email")).first()
        if existing_email:
            return make_response(({"error": "Email already exists"}), 400)

        try:
            new_user = User(
                username=data.get("username"),
                email=data.get("email"),
                password=data.get("password"),
                bio=data.get("bio"),
                avatar=data.get("avatar")
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except IntegrityError:
            db.session.rollback()
            return make_response(({"error": "An error occurred while creating the user"}), 500)

@app.errorhandler(IntegrityError)
def handle_integrity_error(e):
    db.session.rollback()
    return make_response(({"error": "An integrity error occurred"}), 400)

@app.route('/users/<int:id>', methods=['GET', 'DELETE', 'PATCH'])
def user_by_id(id):
    user = User.query.filter(User.id == id).first()
    #Check if user does not exist
    if not user:
        return make_response({"error": "User not found"}, 404)

    if request.method == 'GET':
        return make_response(user.to_dict(), 200)

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "User deleted."
        }

        return make_response(response_body, 200)

    elif request.method == 'PATCH':
        data = request.get_json()

        for attr, value in data.items():
            setattr(user, attr, value)

        try:
            db.session.commit()
            return make_response(user.to_dict(), 200)
        #Error handler for unsuccessful user update
        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "An error occurred while updating the user"}, 400)


if __name__ == '__main__':
    app.run(port=5555, debug=True)



