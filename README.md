# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
<!-- db設計 -->
## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|
|user_id|integer|
### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- belongs_to :user
- has_many :messages
- has_many :groups_users
- has_many  :users,  through:  :groups_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|
|password|string|
|nickname|string|

### Association
- has_many :messages
- has_many :groups_users
- has_many  :groups,  through:  :groups_users

