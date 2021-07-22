const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value); // String을 number로 변환 : parseInt, + 붙여주기

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice)
}


// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // 선택된 자석들만 선택, NodeList로 추가

    // 스프레드 연산자는 배열의 요소를 복사한다. 여기서는 노드 목록을 일반 배열로 변환한다.
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); 

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length; // 선택된 노드 갯수 가져오기
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select and count
movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount()
})

// Seat click event
container.addEventListener('click', e => {
    // seat 클래스 포함 되어 있고 occupied가 없는 클래스만 반응
    if (e.target.classList.contains('seat') && !(e.target.classList.contains('occupied'))) { 
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

