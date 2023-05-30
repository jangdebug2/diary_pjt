//화면이 로드가 된다면
document.addEventListener('DOMContentLoaded', function(){
    console.log('DOCUMENT READY!!');

    init(); //기본 초기화 함수 호출


});  


const init = () => {
    console.log('init() CALLED!!');

    addEvents();
    
}

const addEvents = () => {

    //일기 쓰기
    let write_diary = document.querySelector('.input_diary .send');
    write_diary.addEventListener('click', function(){
        send_diary();
    });


    //내 일기 보기
    let my_diary = document.querySelector('.show_my_diary .mine');
    my_diary.addEventListener('click', function(){
        show_my_diary();
    });


    //전체 글 보기
    let all_diary = document.querySelector('.all_diary .all');
    all_diary.addEventListener('click', function(){
        admin_check(1);
    });

    //전체 회원 보기
    let all_member = document.querySelector('.all_diary .mem');
    all_member.addEventListener('click', function(){
        admin_check(2);
    });

    //로그인
    let login_user = document.querySelector('.login .login_user');
    login_user.addEventListener('click', function(){
        login_check();
    });

    //회원가입 
    let create_user = document.querySelector('.login .create_user');
    create_user.addEventListener('click', function(){
        create_id();
    });

}