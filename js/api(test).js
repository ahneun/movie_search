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

        function createMovieSection() {
            // section 생성
            const section = document.createElement('section')
            // section.setAttribute('type', 'card')
            for (i = 0; i < list.length; i++) {

                // div 생성
                const newDiv = document.createElement('div');
                newDiv.classList.add('movieCard');
                newDiv.classList.add('btn');
                newDiv.setAttribute('id', list[i].id);

                // Image 생성
                const newImg = document.createElement('img')
                newImg.setAttribute('class', 'movieImg');
                newImg.src = `https://image.tmdb.org/t/p/w200${list[i].poster_path}`;

                // Image Div에 삽입
                newDiv.appendChild(newImg);

                // Title 생성
                const newH3 = document.createElement('h3')
                newH3.setAttribute('class', 'movieTitle');
                newH3.innerHTML = list[i].title;

                // Title Div에 삽입
                newDiv.appendChild(newH3);

                // Overview 생성
                const newP1 = document.createElement('p')
                newP1.setAttribute('class', 'movieOverview');
                newP1.innerHTML = list[i].overview

                // Overview Div에 삽입
                newDiv.appendChild(newP1);

                // Rate 생성
                const newP2 = document.createElement('p')
                newP2.setAttribute('class', 'movieRate');
                newP2.innerHTML = list[i].vote_average

                // Rate Div에 삽입
                newDiv.appendChild(newP2);

                // Div section에 삽입
                section.appendChild(newDiv);
            }
            // section body에 삽입
            // index 꼭 넣어야 동작함
            
            document.getElementsByTagName('body')[0].appendChild(section);
        }

        createMovieSection();
        const target = getElementsByTagName('section')
        for(k = 0; k < list.length; k++) {
            
            target[k].addEventListener('click', () => {
                alert('영화 id : ' + list[i].id);
            });
        }
    })


// let movieInfo = list.map((x) => {
//     return [x.poster_path, x.title, x.overview, x.vote_average, x.id]
// })