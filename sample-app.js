Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // Meteorが実行すると起動するイベントハンドラ
  Template.body.helpers({
    tasks: function () {
      //mongoDBの中の情報をTasks変数内に取得
      //createAt:-1で新しい順
      return Tasks.find({},{sort: {createAt: -1}});
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