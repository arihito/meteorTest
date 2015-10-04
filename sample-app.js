Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // Meteorが実行すると起動する
  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        //hideCompletedが設定されている場合checkedが無いものだけに絞り込まれる
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        //mongoDBの中の情報をTasks変数内に取得
        //createAt:-1で新しい順
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    //HTML上でチェックをとるとセッション変数のhideCompletedの値が取れる
    hideCompleted: function() {
      return Session.get("hideCompleted");
    },
    //チェックした数をカウント
    incompleteCount: function() {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  //クラス指定したformに対して関数の定義
  Template.body.events({
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
    },
    //チェックボックスを変更する度にhideCompletedというセッション変数に値が設定される
    "change .hide-completed input": function(event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  // チェックボックスと削除ボタンの機能追加
  // taskテンプレートに設定
  Template.task.events({
    "click .toggle-checked": function() {
      // 第1引数のidを第2引数に渡してデータを更新
      Tasks.update(this._id, {
        // checkedというプロパティに変更前のcheckboxの値を代入
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function() {
      // 削除するデータをidに渡す
      Tasks.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}