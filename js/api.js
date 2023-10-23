function createMovieCard(movie) {
    // div 생성
    const newDiv = document.createElement('div');
    newDiv.classList.add('movieCard');
    newDiv.classList.add('btn');
    newDiv.setAttribute('id', movie.id);

    //div click 이벤트 설정
    newDiv.addEventListener("click", () => {
        alert(`영화 ID : ${newDiv.id}`);
    });

    // Image 생성
    const newImg = document.createElement('img')
    newImg.classList.add('movieImg');
    newImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

    // Title 생성
    const newH3 = document.createElement('h3')
    newH3.classList.add('movieTitle');
    newH3.innerHTML = movie.title;

    // Overview 생성
    const newP1 = document.createElement('p')
    newP1.classList.add('movieOverview');
    newP1.innerHTML = movie.overview

    // Rate 생성
    const newP2 = document.createElement('p')
    newP2.classList.add('movieRate');
    newP2.innerHTML = movie.vote_average

    // 모두 Div에 삽입
    newDiv.appendChild(newImg);
    newDiv.appendChild(newH3);
    newDiv.appendChild(newP2);
    newDiv.appendChild(newP1);

    return newDiv
}

function checkMovie(list, input) {
    let changed = []

    if (input !== '') {
        for (i = 0; i < list.length; i++) {
            let targetTitle = list[i].title.toLowerCase()
            if (targetTitle.indexOf(input) != -1) {
                changed.push(list[i])
            }
        }
    } else {
        changed = [...list]
    }

    return changed
}

function setMessage(list, input) {
    let message = ''

    if(list.length === 0) {
        message += '검색 결과가 존재하지 않습니다.'
    } else {
        if(input.replaceAll(' ', '') !== '') {
            message += `'${input}'로/으로 검색한 결과를 보여드릴게요.`
        } else {
            message += '검색어를 입력하지 않아 초기 화면으로 돌아갑니다'
        }
    }

    return message
}

function APICall() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmE1ZjI4MDhiYmEwODVjNGRjZDEyZTI1ZDNjNGQ4ZSIsInN1YiI6IjY1MmY0OWY4MGNiMzM1MTZmODg1NDBmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tYrA68NFXDexA3On215rA_7FhCTSfbRmBpBJY-3PapA'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
        .then(response => response.json())
        .then(response => {
            let list = response.results;
            const form = document.getElementById('searchForm')

            // form submit 이벤트 설정
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                const input = document.getElementById('searchInput').value.toLowerCase()

                // input을 포함하는 list 재생성(= target)
                const target = checkMovie(list, input);
                document.getElementsByTagName('section')[0].innerHTML=''

                // 재생성된 리스트로 카드 생성
                target.forEach((movie) => {
                    const card = createMovieCard(movie);
                    document.getElementsByTagName('section')[0].appendChild(card);
                    // console.log(document.getElementsByTagName('section'))
                });

                // 재생성된 리스트의 length에 따라 alert 발생
                alert(`${setMessage(target, input)}`)
            });
            // ---------------------------------------------------------------------------------------------
            list.forEach((movie) => {
                const card = createMovieCard(movie);
                document.getElementsByTagName('section')[0].appendChild(card);
            });

        })
}

APICall();