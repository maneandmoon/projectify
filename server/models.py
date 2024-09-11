from config import db, bcrypt
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    bio = db.Column(db.String(500))
    avatar = db.Column(db.String(200))
    projects = db.relationship('Project', back_populates='user')
    interests = db.relationship('UserInterest', back_populates='user')
    interest_names = association_proxy('interests', 'interest_name')
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)

    serialize_rules = ('-projects.user', '-interests.user', '-projects.comments', '-projects.interests')
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('password is private')
        # return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    link = db.Column(db.String(200))
    comments = db.relationship('Comment', back_populates='project')
    interests = db.relationship('ProjectInterest', back_populates='project')
    interest_names = association_proxy('interests', 'interest_name')
    user = db.relationship('User', back_populates='projects')

    serialize_rules = ('-user.projects', '-comments.project', '-interests.project', '-user.interests')

class Interest(db.Model, SerializerMixin):
    __tablename__ = 'interests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_interests = db.relationship('UserInterest', back_populates='interest')
    project_interests = db.relationship('ProjectInterest', back_populates='interest')

    serialize_rules = ('-user_interests.interest', '-project_interests.interest')

class UserInterest(db.Model, SerializerMixin):
    __tablename__ = 'user_interest'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    interest_id = db.Column(db.Integer, db.ForeignKey('interests.id'), nullable=False)
    user = db.relationship('User', back_populates='interests')
    interest = db.relationship('Interest', back_populates='user_interests')
    interest_name = association_proxy('interest', 'name')

    serialize_rules = ('-user.interests', '-interest.user_interests', '-user.projects')

class ProjectInterest(db.Model, SerializerMixin):
    __tablename__ = 'project_interest'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    interest_id = db.Column(db.Integer, db.ForeignKey('interests.id'), nullable=False)
    project = db.relationship('Project', back_populates='interests')
    interest = db.relationship('Interest', back_populates='project_interests')
    interest_name = association_proxy('interest', 'name')

    serialize_rules = ('-project.interests', '-interest.project_interests', '-project.user')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    project = db.relationship('Project', back_populates='comments')
    user = db.relationship('User')

    serialize_rules = ('-project.comments', '-user.projects', '-user.interests')