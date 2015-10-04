Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });

  Template.body.events({
    //クラス指定したformに対して関数の定義
    "submit .new-task": function (event) {
      event.preventDefault();
      //textフォームの入力値の取得
      var text = event.target.text.value;
      //mongoDBへの登録
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });
      event.target.text.value = "";
    }
  })
}