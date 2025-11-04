import * as fsPromises from "node:fs/promises";

function g1() {
    // TODO: then のネストを無くしなさい
    // return wait(1000).then(() => {
    //     console.log("A");
    //     return wait(2000).then(() => {
    //         console.log("B");
    //         return wait(3000).then(() => {
    //             console.log("C");
    //         });
    //     });
    // });
    console.log('g1 start');
    return wait(1000)
        .then(() => { console.log("A"); })
        .then(() => wait(2000))
        .then(() => { console.log("B"); })
        .then(() => wait(3000))
        .then(() => { console.log("C"); });
}

function g2() {
    // TODO: new Promise を使わないように書き換えなさい
    // return new Promise((resolve, reject) => {
    //     wait(1000)
    //         .then(() => console.log("A"))
    //         .then(() => wait(2000))
    //         .then(() => console.log("B"))
    //         .then(() => wait(3000))
    //         .then(() => console.log("C"))
    //         .then(resolve, reject);
    // });

    console.log('g2 start');
    return wait(1000)
        .then(() => console.log("A"))
        .then(() => wait(2000))
        .then(() => console.log("B"))
        .then(() => wait(3000))
        .then(() => console.log("C"));

}

function g3() {
    // 以下2つの関数が存在するとします (中身は適当)
    console.log('g3 start');
    function fetchUser() {
        return Promise.resolve({ id: 42, name: "John" });
    }
    function fetchUserFriends(user) {
        return Promise.resolve([
            { name: "Sam", id: 100 },
            { name: "Bob", id: 1 },
        ]);
    }

    // TODO: var, let, const による変数宣言を無くしなさい。async/awaitは使用しないこと。
    // let temp = 0;
    // return fetchUser()
    //     .then((user) => {
    //         temp = user;
    //         return fetchUserFriends(user);
    //     })
    //     .then((friends) => {
    //         console.log(`${temp.name} has ${friends.length} friends!`);
    //     });

    return fetchUser()
        .then((user) => { // fetchUserでとってきたuserオブジェクト
            return fetchUserFriends(user)
                .then((friends) => { // thenのネストでfetchUserFriendsを待つ
                    return { user, friends }; // 完了したらuserオブジェクトをfetchUserFriendsに渡して返す
                });
        })
        .then(({ user, friends }) => { // とってきたuser情報
            console.log(`${user.name} has ${friends.length} friends!`);
        });
}

function g4() {
    function someFunction() {
        return 42;
    }
    console.log('g4 start');
    // NOTE: この関数 g4 は Promise を返す必要があるものとする
    // (利用しているフレームワークはライブラリがそういう関数を要求するとでも思って下さい)
    // TODO: new Promise を使わないように書き換えなさい。async/awaitは使用しないこと。
    // return new Promise((resolve) => {
    //     let value = someFunction();
    //     return value;
    // });

    // promiseを返さない関数で、どうやってnew Promiseを使わないでPromiseを返す？
    // return fsPromises.someFunction()
    //     .then((value) => {
    //         return value;
    //     });

}

// ---------　共通関数　---------
function wait(msec) {
    return new Promise((resolve) => setTimeout(resolve, msec));
}

// ---------- 確認 ----------
g1()
    .then(() => {
        console.log('g1 done');
    })
    .then(() => g2())
    .then(() => {
        console.log('g2 done');
    })
    .then(() => g3())
    .then(() => {
        console.log('g3 done');
    }); 