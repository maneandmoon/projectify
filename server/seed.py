#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        
        user_1 = User(username='user1', email='user1@example.com', password='password1', bio='Bio for user1', avatar='avatar1.png')
        user_2 = User(username='user2', email='user2@example.com', password='password2', bio='Bio for user2', avatar='avatar2.png')
        user_3 = User(username='user3', email='user3@example.com', password='password3', bio='Bio for user3', avatar='avatar3.png')
        user_4 = User(username='user4', email='user4@example.com', password='password4', bio='Bio for user4', avatar='avatar4.png')
        user_5 = User(username='user5', email='user5@example.com', password='password5', bio='Bio for user5', avatar='avatar5.png')

        users = [user_1, user_2, user_3, user_4, user_5]

        db.session.add_all(users)
        db.session.commit()


