Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // Meteorが実行すると起動するイベントハンドラ
  Template.body.helpers({
    tasks: function () {
      //mongoDBの中の情報をTasks変数内に取得
      //createAt:-1で新しい順
      return Tasks.find({},{sort: {createdAt: -1}});
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
    }
  })

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
  })
}