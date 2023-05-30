//로그인 체크
const login_check = () => {
    console.log('login_check CALLED');

    let user_id = prompt('아이디 입력');
    let user_pw = prompt('비밀번호 입력');
    let login_id_flag = false;

    for(let i=0; i<diaryUser.size; i++){
        let diaryUser_user = diaryUser.get(i);

        if(diaryUser_user.id == user_id){
            if(diaryUser_user.pw == user_pw){
                login_id_flag = true;
                alert('로그인 성공!!!');
                
                let success_login = document.querySelector('.login .login_box');
                success_login.textContent = user_id;
            }
            else{
                login_id_flag = true;
                alert('비밀번호가 틀렸습니다.');
            }            
        }
    }
    if(login_id_flag == false){
        alert('일치하는 아이디가 없습니다.');
    }
    document.querySelector('.diary_content').value = '';
}

//일기 쓰기
const send_diary = () => {
    console.log('send_diary CALLED');

    if(document.querySelector('.login .login_box').innerHTML == 'example'){
        alert('로그인하셔야 이용하실 수 있습니다.');
        login_check();
    }
    else{
        if(document.querySelector('.input_diary .diary_content').value != '' ){        //아이디와 내용이 공백이 아니라면
            let input_user = document.querySelector('.login .login_box').innerHTML;
            let input_content = document.querySelector('.input_diary .diary_content').value;
            //console.log(input_content);
            let add_diary = new Diary(input_user, input_content);   //다이어리 클래스의 객체 생성
            record.set(index, add_diary);   //기록 디비에 set
            index++;    //key값인 index 증가
    
            document.querySelector('.diary_content').value = '';
            alert('일기 등록 완료!!!');
        }
        else{
            document.querySelector('.diary_content').value = '';
            alert('내용을 입력해주세요!!!');
        }
    }
}

//회원가입
const create_id = () => {
    console.log('create_id CALLED');

    let createID = prompt('생성할 ID 입력');
    let createPW = '';
    let no_ID_flag = false;
    if(createID == 'admin'){
        alert('관리자명으로는 생성할 수 없습니다.');
    }
    else{
        for(let i=0; i<diaryUser.size; i++){
            let compare_id = diaryUser.get(i).id;
            if(createID == compare_id){
                no_ID_flag = true;
                alert('이미 존재하는 ID 입니다.');
                break;
            }
        }
        if(!no_ID_flag){
            createPW = prompt('비밀번호 입력');
            let new_member = new User_info(createID, createPW);
    
            diaryUser.set(user_index, new_member);
            user_index++;
            alert('계정이 생성되었습니다.');
        }
    }
    
}

//내 일기 보기
const show_my_diary = () => {
    console.log('my_diary CALLED');

    if(document.querySelector('.login .login_box').innerHTML == 'example'){
        alert('로그인하셔야 이용하실 수 있습니다.');
        login_check();
    }
    else{
        let message_Window = document.querySelector('ul.ul_diary'); //보기 할 때마다 뷰 리셋 후 실행
        message_Window.textContent = '';

        let my_id = document.querySelector('.login .login_box').innerHTML;
        //console.log(my_id);
        
        let my_diary_cnt = 0;
        for(let i=0; i<record.size; i++){
            let record_user = record.get(i);

            if(my_id == record_user.id){    
                template_clone(i, 1);
                my_diary_cnt++;
            }
        }

        alert(`총 ${my_diary_cnt}개의 일기를 발견하였습니다.`);
    }

    
 
}

//관리자 체크
const admin_check = (num) => {
    console.log('admin_check CALLED');
  
    let admin_id = prompt('관리자 아이디 입력');
    let admin_pw = prompt('관리자 비밀번호 입력');

    if(admin_id == "admin" && admin_pw == 'admin'){
        if(num == 1){
            view_diary();
        }
        else if(num == 2){
            view_member();
        }       
    }
    else{
        alert('아이디와 비밀번호가 일치하지 않습니다.');
    }


    // if(num == 1){
    //     view_diary();
    // }
    // else if(num == 2){
    //     view_member();
    // }
}

//전체 글 보기
const view_diary = () => {
    console.log('view_diary CALLED');
    let message_Window = document.querySelector('ul.ul_diary'); //보기 할 때마다 뷰 리셋 후 실행
    message_Window.textContent = '';

    
    for(let i=0; i<record.size; i++){
        template_clone(i, 1);
    }
    alert(`총 ${record.size}개의 일기 발견!!`);
}

//전체 회원 보기
const view_member = () => {
    console.log('view_member CALLED');
    let message_Window = document.querySelector('ul.ul_diary'); //보기 할 때마다 뷰 리셋 후 실행
    message_Window.textContent = '';

    for(let i=0; i<diaryUser.size; i++){
        template_clone(i, 2);
    }
    alert(`총 ${diaryUser.size}개의 유저 발견!!`);
}

//템플렛 클론
const template_clone = (num, option) => {
    if(option == '1'){
        let tpl = document.querySelector('#diary_item');    //템플렛 id
        let clone = document.importNode(tpl.content, true); //템플렛 클론
        //let name = clone.querySelector('div.user');
        let item_box_user = clone.querySelector('.item_user');  //템플렛 유저id
        let item_box_txt = clone.querySelector('.item_txt');    //템플렛 내용

        let user = record.get(num);   //디비에 저장된 내용
        let user_id = user.id;     //디비-아이디
        let user_content = user.content;    //디비-내용
            
        item_box_user.textContent = user_id;    //템플렛 유저id에 디비-아이디 넣기
        item_box_txt.textContent = user_content; //템플렛 내용에 디비-내용 넣기

        //console.log(record.get(i));

        let ul = document.querySelector('.ul_diary');   //본문에 클론 복사
        ul.appendChild(clone);
    }

    else if(option == '2'){
        console.log('in');
        let tpl = document.querySelector('#diary_item');    //템플렛 id
        let clone = document.importNode(tpl.content, true); //템플렛 클론
        //let name = clone.querySelector('div.user');
        let item_box_user = clone.querySelector('.item_user');  //템플렛 유저id
        let item_box_txt = clone.querySelector('.item_txt');    //템플렛 내용

        let user = diaryUser.get(num);   //디비에 저장된 내용
        let user_id = user.id;     //디비-아이디
        let user_pw = user.pw;    //디비-내용
            
        item_box_user.textContent = user_id;    //템플렛 유저id에 디비-아이디 넣기
        item_box_txt.textContent = user_pw; //템플렛 내용에 디비-내용 넣기

        //console.log(record.get(i));

        let ul = document.querySelector('.ul_diary');   //본문에 클론 복사
        ul.appendChild(clone);
    }
    
}
