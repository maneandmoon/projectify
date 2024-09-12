#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Project, Comment, Interest, UserInterest, ProjectInterest

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Clear existing data
        db.session.query(UserInterest).delete()
        db.session.query(ProjectInterest).delete()
        db.session.query(Comment).delete()
        db.session.query(Project).delete()
        db.session.query(User).delete()
        db.session.query(Interest).delete()
        db.session.commit()

        # Create interests
        interests = []
        for _ in range(10):
            interest = Interest(name=fake.word())
            interests.append(interest)
            db.session.add(interest)
        db.session.commit()

        # Create users
        users = []
        for _ in range(30):
            user = User(
                username=fake.user_name(),
                # email=fake.email(),
                # password=fake.password(),
                bio=fake.text(max_nb_chars=200),
                # avatar=fake.image_url()
            )
            users.append(user)
            db.session.add(user)
        db.session.commit()

        # Create projects
        projects = []
        for _ in range(20):
            project = Project(
                user_id=rc(users).id,
                title=fake.sentence(nb_words=6),
                description=fake.text(max_nb_chars=500),
                link=fake.url(),
                is_featured=randint(0, 1) == 1  

            )
            projects.append(project)
            db.session.add(project)
        db.session.commit()

        # Create comments
        for _ in range(80):
            comment = Comment(
                project_id=rc(projects).id,
                user_id=rc(users).id,
                content=fake.text(max_nb_chars=200)
            )
            db.session.add(comment)
        db.session.commit()

        # Create user interests
        for user in users:
            for _ in range(randint(1, 5)):
                user_interest = UserInterest(
                    user_id=user.id,
                    interest_id=rc(interests).id
                )
                db.session.add(user_interest)
        db.session.commit()

        # Create project interests
        for project in projects:
            for _ in range(randint(1, 5)):
                project_interest = ProjectInterest(
                    project_id=project.id,
                    interest_id=rc(interests).id
                )
                db.session.add(project_interest)
        db.session.commit()

        print("Seeding complete!")
