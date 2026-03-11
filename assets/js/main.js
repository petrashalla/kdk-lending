Fancybox.bind("[data-fancybox]", {
	// Your custom options
});

// animation
const animationItems = document.querySelectorAll(".animation-item");
if (animationItems.length > 0) {
	function onEntry(e) {
		e.forEach((e) => {
			e.isIntersecting && e.target.classList.add("animation-active");
		});
	}
	let options = {
			threshold: [0.5],
		},
		observer = new IntersectionObserver(onEntry, options);
	for (let e of animationItems) observer.observe(e);
}
// end animation

/* hide header */
let scrollWidthFunc = () => {
	let scrollWidth = window.innerWidth - document.body.clientWidth;
	document.querySelector("html").style.paddingRight = scrollWidth + "px";
	document.querySelector("header").style.paddingRight = scrollWidth + "px";
};
const scrollTop = document.querySelector(".scroll-top");
if (scrollTop)
	scrollTop.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});



document.addEventListener("DOMContentLoaded", function () {
	/* burger menu */
	const burgerMenu = document.querySelector(".burger");
	if (burgerMenu) {
		const headerMobile = document.querySelector(".header__menu");
		const header = document.querySelector(".header");
		const plashka = document.querySelector(".header__plashka");
		burgerMenu.addEventListener("click", () => {
			if (burgerMenu.classList.contains("open")) {
				if (plashka) {
					plashka.style.display = "block";
				}
				document.body.classList.remove("burger-lock");
			} else {
				if (plashka) {
					plashka.style.display = "none";
				}
				document.body.classList.add("burger-lock");
			}
			headerMobile.classList.toggle("open");
			burgerMenu.classList.toggle("open");
			header.classList.toggle("header--active");

			document.querySelector("html").classList.toggle("burger-lock");
		});
	}
	/* end burger menu */

	// Popups
	function popupClose(popupActive) {
		popupActive.classList.remove("open");
		setTimeout(() => {
			if (!popupActive.classList.contains("open")) {
				popupActive.classList.remove("active");
			}
		}, 400);
		document.body.classList.remove("lock");
		document.querySelector("html").style.paddingRight = 0;
		document.querySelector("html").classList.remove("lock");
		document.querySelector("header").removeAttribute("style");
	}
	const popupOpenBtns = document.querySelectorAll(".popup-btn");
	const popups = document.querySelectorAll(".popup");
	//const originalTitlePopup2 = document.querySelector(".original-title").innerHTML;
	const closePopupBtns = document.querySelectorAll(".close-popup-btn");
	closePopupBtns.forEach(function (el) {
		el.addEventListener("click", function (e) {
			popupClose(e.target.closest(".popup"));
		});
	});
	popupOpenBtns.forEach(function (el) {
		el.addEventListener("click", function (e) {
			e.preventDefault();
			const path = e.currentTarget.dataset.path;
			const currentPopup = document.querySelector(`[data-target="${path}"]`);
			if (currentPopup) {
				popups.forEach(function (popup) {
					popupClose(popup);
					popup.addEventListener("click", function (e) {
						if (!e.target.closest(".popup__content")) {
							popupClose(e.target.closest(".popup"));
						}
					});
				});
				currentPopup.classList.add("active");
				setTimeout(() => {
					currentPopup.classList.add("open");
				}, 10);
				if (currentPopup.getAttribute("data-target") == "popup-change") {
					let originaTitle = currentPopup.querySelector(".original-title");
					if (el.classList.contains("change-item__btn")) {
						if (el.classList.contains("doctor__btn-js")) {
							let currentItem = el.closest(".change-item");
							let currentTitile = currentItem.querySelector(".change-item__title");
							originaTitle.innerHTML = "Записаться на приём к врачу: " + currentTitile.innerHTML;
						} else {
							if (el.classList.contains("change-item__btn_current")) {
								originaTitle.textContent = el.textContent;
							} else {
								let currentItem = el.closest(".change-item");
								let currentTitile = currentItem.querySelector(".change-item__title");
								originaTitle.innerHTML = currentTitile.innerHTML;
							}
						}
					} else {
						originaTitle.innerHTML = originalTitlePopup2;
					}
				}

				if (currentPopup.getAttribute("data-target") == "popup-jobs") {
					let currentItems = el.closest(".jobs__items");
					let originalText = currentPopup.querySelector(".jobs__inner_original");
					if (originalText && currentItems.querySelector(".jobs__inner")) {
						originalText.innerHTML = currentItems.querySelector(".jobs__inner").innerHTML;
					}
				}
				e.stopPropagation();
				scrollWidthFunc();
				document.querySelector("html").classList.add("lock");
			}
		});
	});
	// end popups


	// video play
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    videoWrappers?.forEach(wrapper => {
        const video = wrapper.querySelector('.video');
        const playBtn = wrapper.querySelector('.play-btn');
        
        if (video && playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                video.play();
                this.classList.add('hidden');
            });
            
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });

            video.addEventListener('pause', function() {
                playBtn.classList.remove('hidden');
            });
            
            video.addEventListener('play', function() {
                playBtn.classList.add('hidden');
            });
            
            video.addEventListener('ended', function() {
                playBtn.classList.remove('hidden');
            });
        }
    });
	// end video play


	/* yandex map */
	const maps = document.querySelectorAll('.map');

	if (maps.length > 0) {

	function onEntryMap(entries) {
		entries.forEach(entry => {
		if (entry.isIntersecting) {
			loadMap();
		}
		});
	}

	const observer = new IntersectionObserver(onEntryMap, {
		threshold: [0.5],
	});

	maps.forEach(map => observer.observe(map));
	}

	function loadMap() {
	if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
		const script = document.createElement('script');
		script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
		script.onload = initMaps;
		document.head.appendChild(script);
	} else {
		initMaps();
	}
	}

	function initMaps() {
		ymaps.ready(() => {
	
		document.querySelectorAll('.map').forEach((mapElement) => {
	
			const points = JSON.parse(mapElement.dataset.points);
	
			const map = new ymaps.Map(mapElement, {
			center: points[0].coords,
			zoom: 15,
			controls: []
			});
	
			points.forEach(point => {
	
			const placemark = new ymaps.Placemark(
				point.coords,
				{
				hintContent: point.hint,
				balloonContent: point.balloon
				},
				{
				iconLayout: "default#image",
				iconImageHref: "assets/img/icons/map-pin.svg",
				iconImageSize: [26, 26],
				iconImageOffset: [-12, -12],
				}
			);
	
			map.geoObjects.add(placemark);
	
			});

			map.setBounds(map.geoObjects.getBounds(), {
				checkZoomRange: true,
				zoomMargin: 20
			});
	
			map.behaviors.disable(['scrollZoom']);
	
		});
	
		});
	}
	/* end yandex map */


	/*  accordion  */
	const acc = document.getElementsByClassName("accordion");
	for (let i = 0; i < acc.length; i++) {
		if (acc[i]) {
			acc[i].addEventListener("click", function () {
				const accContent = this.querySelector(".accordion__content") || this.parentElement.querySelector(".accordion__content");
				if (accContent.classList.contains("accordion__content--active")) {
					accContent.classList.remove("accordion__content--active");
					this.classList.remove("accordion--active");
					accContent.style.maxHeight = "0";
				} else {
					accContent.classList.add("accordion__content--active");
					this.classList.add("accordion--active");

					const contentHeight = accContent.scrollHeight;
					accContent.style.maxHeight = `${contentHeight}px`;
				}
			});
		}
	}
	/*  end accordion   */

	/*  tab  */
	const showTab = (elTabBtn) => {
		const elTab = elTabBtn.closest(".tab");
		if (elTabBtn.classList.contains("tab-btn--active")) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tab-content[data-id="${targetId}"]`);

		const elTabBtnActive = elTab.querySelector(".tab-btn--active");
		if (elTabBtnActive) {
			elTabBtnActive.classList.remove("tab-btn--active");
		}

		const elTabPaneShow = elTab.querySelectorAll(".tab-content--active");
		elTabPaneShow.forEach((pane) => pane.classList.remove("tab-content--active"));

		elTabBtn.classList.add("tab-btn--active");
		elTabPanes.forEach((pane) => pane.classList.add("tab-content--active"));
	};

	const tabButtons = document.querySelectorAll(".tab-btn");
	tabButtons.forEach((btn) => {
		if (btn) {
			btn.addEventListener("click", function (e) {
				showTab(this);
				quantityElem();
			});
		}
	});
	/*  end tab */

	/*  btn more  */
	const moreBtns = document.querySelectorAll(".btn-more");
	moreBtns.forEach((moreBtn) => {
		if (moreBtn) {
			const moreContent = moreBtn.previousElementSibling;

			if (moreContent.scrollHeight <= moreContent.clientHeight) {
				moreBtn.style.display = "none";
			} else {
				const textBtn = moreBtn.innerHTML;
				moreBtn.addEventListener("click", function () {
					const heightMoreContent = moreContent.style.maxHeight;
					this.classList.toggle("active");

					if (moreContent.style.maxHeight) {
						moreContent.style.maxHeight = null;
						this.textContent = textBtn;
					} else {
						moreContent.style.maxHeight = moreContent.scrollHeight + "px";
						this.textContent = "Свернуть";
					}
				});
			}
		}
	});
	/*  end btn more  */


	// Смена фона шапки при скролле
	const header = document.getElementById("header");
	function changeColorHeader() {
		if (window.scrollY > 100) {
			header.classList.add("header--light");
		} else {
			header.classList.remove("header--light");
		}
	}
	changeColorHeader();
	window.addEventListener("scroll", () => {
		changeColorHeader();
	});


	// плавное пролистывание ссылок в шапке
	const navLinks = document.querySelectorAll('.header__nav-link[href^="#"]');
	navLinks.forEach(link => {
	  link.addEventListener('click', function(e) {
		e.preventDefault();
		
		const targetId = this.getAttribute('href');
		const targetElement = document.querySelector(targetId);
		
		if (targetElement) {
		  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150;
		  
		  if ('scrollBehavior' in document.documentElement.style) {
			window.scrollTo({
			  top: targetPosition,
			  behavior: 'smooth'
			});
		  } else {
			window.scrollTo(0, targetPosition);
		  }
		}
	  });
	});
});



document.addEventListener("DOMContentLoaded", function () {
  (() => {
    const PLAYER_SELECTOR = ".audio-player";
    const WAVE_SELECTOR = ".audio-player__wave";
    const BAR_SELECTOR = ".audio-player__bar";
    const BTN_SELECTOR = ".audio-player__btn";
    const TIME_SELECTOR = ".audio-player__time";
    const AllTIME_SELECTOR = ".audio-player__time-all";

    const BAR_WIDTH = 4;
    const BAR_GAP = 3;
    const BAR_STEP = BAR_WIDTH + BAR_GAP;


    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    function generateBarHeights(count) {
      const heights = [];

      for (let i = 0; i < count; i++) {
        const t = i / Math.max(count - 1, 1);

        const base =
          10 +
          Math.abs(Math.sin(t * 8.5)) * 14 +
          Math.abs(Math.cos(t * 17)) * 8 +
          Math.abs(Math.sin((t + 0.3) * 31)) * 10;

        heights.push(Math.round(Math.min(base, 52)));
      }

      return heights;
    }

    function getBarsCount(containerWidth) {
      return Math.max(1, Math.floor((containerWidth + BAR_GAP) / BAR_STEP));
    }

    function renderWave(player) {
      const wave = player.querySelector(WAVE_SELECTOR);
      const audio = player.querySelector("audio");

      if (!wave) return;

      const width = wave.clientWidth;
      if (!width) return;

      const barsCount = getBarsCount(width);
      const prevCount = Number(wave.dataset.count || 0);

      if (prevCount === barsCount) return;

      const progress = audio && audio.duration
        ? audio.currentTime / audio.duration
        : 0;

      wave.innerHTML = "";
      wave.dataset.count = String(barsCount);

      const heights = generateBarHeights(barsCount);

      heights.forEach((height, index) => {
        const bar = document.createElement("div");
        bar.className = BAR_SELECTOR.slice(1);
        bar.style.height = `${height}px`;

        if (index < Math.floor(progress * barsCount)) {
          bar.classList.add("is-active");
        }

        wave.appendChild(bar);
      });
    }

    function updateProgress(player) {
      const audio = player.querySelector("audio");
      const time = player.querySelector(TIME_SELECTOR);
      const bars = player.querySelectorAll(BAR_SELECTOR);

      if (!audio || !time || !bars.length) return;

      time.textContent = formatTime(audio.currentTime);

      const progress = audio.duration ? audio.currentTime / audio.duration : 0;
      const activeCount = Math.floor(progress * bars.length);

      bars.forEach((bar, index) => {
        bar.classList.toggle("is-active", index < activeCount);
      });
    }

    function pauseOtherPlayers(currentPlayer) {
      document.querySelectorAll(PLAYER_SELECTOR).forEach((player) => {
        if (player === currentPlayer) return;

        const audio = player.querySelector("audio");
        const btn = player.querySelector(BTN_SELECTOR);

        if (audio && !audio.paused) {
          audio.pause();
        }

        if (btn) {
          btn.textContent = "▶";
        }
      });
    }

    function initPlayer(player) {
      const audio = player.querySelector("audio");
      const btn = player.querySelector(BTN_SELECTOR);
      const time = player.querySelector(TIME_SELECTOR);
      const timeAll = player.querySelector(AllTIME_SELECTOR);

      if (!audio || !btn || !time) return;

      renderWave(player);

      audio.addEventListener("loadedmetadata", () => {
        time.textContent = "00:00";

		if (Number.isFinite(audio.duration)) {
			timeAll.textContent = formatTime(audio.duration);
		  }


        renderWave(player);
        updateProgress(player);
      });

      audio.addEventListener("timeupdate", () => {
        updateProgress(player);
      });

      audio.addEventListener("play", () => {
        pauseOtherPlayers(player);
        btn.textContent = "❚❚";
      });

      audio.addEventListener("pause", () => {
        if (!audio.ended) {
          btn.textContent = "▶";
        }
      });

      audio.addEventListener("ended", () => {
        btn.textContent = "▶";
        updateProgress(player);
      });

      btn.addEventListener("click", async () => {
        if (audio.paused) {
          pauseOtherPlayers(player);
          try {
            await audio.play();
            btn.textContent = "❚❚";
          } catch (error) {
            console.error("Ошибка воспроизведения аудио:", error);
          }
        } else {
          audio.pause();
          btn.textContent = "▶";
        }
      });
    }

    const players = document.querySelectorAll(PLAYER_SELECTOR);
    players.forEach(initPlayer);

    let resizeTimeout = null;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        document.querySelectorAll(PLAYER_SELECTOR).forEach((player) => {
          renderWave(player);
          updateProgress(player);
        });
      }, 100);
    });
  })();
});