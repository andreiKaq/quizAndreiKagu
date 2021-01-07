let card2 = null;
let card3 = [];
let card4 = null;
let card5 = {
	name: "",
	email: "",
	agree: false,
};

init();

function init() {
    for (let i = 1; i <= 6; i++) {
        hideCard(i);
    }
    showCard(1);

    updateProgress();

    init1();
    init2();
    init3();
    init4();
	init5();
	init6();
}

function showCard (n) {
    const card = document.querySelector(`[data-card='${n}']`);
    card.classList.remove('hide');
}

function hideCard(n) {
    const card = document.querySelector(`[data-card='${n}']`);
    card.classList.add('hide');
}

function updateProgress(n) {
	let progress = 0;

	if (card2) {
		progress += 25
	}

	if (card3.length) {
		progress += 25
	}

	if (card4) {
		progress += 25
	}

	if (card5.name && card5.email && card5.agree) {
		progress += 25
	}

    const progresbars = document.querySelectorAll('.progress-bar')
    for (const progresbar of progresbars) {
        progresbar.setAttribute('aria-valuenow', progress)
		progresbar.style.width = `${progress}%`
		
		if (progress === 100) {
			progresbar.classList.add('bg-success')
		} else {
			progresbar.classList.remove('bg-success')
		}
	}
	
}

function init1() {
    const card = document.querySelector("[data-card='1']");
    const button = card.querySelector('button');

    button.addEventListener('click', () => {
        hideCard(1);
        showCard(2);
    });

}

function init2() {
    const card = document.querySelector("[data-card='2']");
    
    const backButton = document.querySelector(`button[data-move='back']`);
    backButton.addEventListener('click', () => {
        hideCard(2);
        showCard(1);
    })
    
    const forwardButton = document.querySelector('button[data-move = "forward"]')
    forwardButton.addEventListener('click', () => {
        hideCard(2);
        showCard(3);
    });

    const lis = card.querySelectorAll('li')
    lis.forEach(li => li.addEventListener('click', () => {
        const input = li.querySelector('input')
        input.checked = true;
        card2 = input.value
        forwardButton.disabled = false;

        updateProgress()
    }))

}

function init3() {
	const card = document.querySelector('[data-card="3"]');
	const items = card.querySelectorAll("[data-item]");

	const backButton = card.querySelector("button[data-move='back']");
	backButton.addEventListener("click", () => {
		hideCard(3);
		showCard(2);
	});

	const fowardButton = card.querySelector("button[data-move='forward']");
	fowardButton.addEventListener("click", () => {
		hideCard(3);
		showCard(4);
	});

	items.forEach((item) =>
		item.addEventListener("click", (e) => {
			const variant = item.dataset.item;
			const input = item.querySelector("input");

			if (card3.includes(variant)) {
				const index = card3.indexOf(variant);
				card3.splice(index, 1);
				input.checked = false;
			} else {
				card3.push(variant);
				input.checked = true;
			}
			
			updateProgress();
			if (card3.length === 0) {
				fowardButton.disabled = true;
			} else {
				fowardButton.disabled = false;
			}

		})
	);
}

function init4() {
    const card = document.querySelector("[data-card='4']");
    
    const backButton = card.querySelector(`button[data-move='back']`);
    backButton.addEventListener('click', () => {
        hideCard(4);
        showCard(3);
    })
    
    const forwardButton = card.querySelector('button[data-move = "forward"]')
    forwardButton.addEventListener('click', () => {
        hideCard(4);
        showCard(5);
    });

    const lis = card.querySelectorAll('li')

    lis.forEach(li => li.addEventListener('click', () => {
        const input = li.querySelector('input')
        input.checked = true;
        card4 = input.value
        forwardButton.disabled = false;
		
		updateProgress()
    }))

}

function init5() {
    const card = document.querySelector('[data-card="5"]');
	const nameInput = card.querySelector('[data-field="name"]');
	const emailInput = card.querySelector('[data-field="email"]');
	const agreeInput = card.querySelector('[data-field="agree"]');

	const update = () => {
		if (card5.name && card5.email && card5.agree) {
			fowardButton.disabled = false;
			progres = 100;
		} else {
			fowardButton.disabled = true;
			progres = 75;
		}

		updateProgress();
	};

	nameInput.addEventListener("keyup", (e) => {
		card5.name = nameInput.value;
		update();
	});

	emailInput.addEventListener("keyup", (e) => {
		card5.email = emailInput.value;
		update();
	});

	agreeInput.addEventListener("change", (e) => {
		card5.agree = agreeInput.checked;
		update();
	});

	const backButton = card.querySelector("button[data-move='back']");
	backButton.addEventListener("click", () => {
		hideCard(5);
		showCard(4);
	});

	const fowardButton = card.querySelector("button[data-move='forward']");
	fowardButton.addEventListener("click", () => {
		hideCard(5);
		showCard(6);
	});
}

function init6() {}