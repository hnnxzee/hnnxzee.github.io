const playButton=document.getElementById("playButton"),nextButton=document.getElementById("nextButton"),playAgainButton=document.getElementById("playAgainButton"),mainSection=document.querySelector("main"),quizInfo=document.querySelector(".quiz-info"),questionNumber=document.getElementById("questionNumber"),questionHeader=document.getElementById("questionHeader"),answerOptions=document.getElementById("answerOptions"),userNameInput=document.getElementById("userName"),userNameCertificate=document.getElementById("userNameCertificate"),resultSection=document.querySelector(".result"),scoreText=document.getElementById("score"),certificateContainer=document.querySelector(".certificate-container"),dateText=document.getElementById("dateText"),finishText=document.getElementById("finish"),uncompletedText=document.getElementById("uncompleted"),backDrop=document.getElementById("backdrop"),downloadCert=document.getElementById("captureButton");let timerId,countdownInterval,timeLeft=20,isQuizSession=!1,currentQuestion=0,score=0;const resultImage=document.querySelector(".result-image"),confettiAnimation=document.querySelector(".confetti"),randomFinishTexts=["Selamat! Kamu berhasil menjawab semua pertanyaan dengan benar!","Hebat! Semua jawabanmu benar!","Luar biasa! Kamu berhasil menyelesaikan tantangan ini!","Yuhuu! Semua jawabanmu benar!","Bagus sekali! Kamu telah berhasil melewati tantangan ini dengan gemilang!","Bravo! Kamu sudah berhasil menjawab semua pertanyaan!","Fantastis! Kamu sudah menguasai tantangan ini!","Impresif! Kamu telah sukses menyelesaikan tantangan ini!","Keren banget! Kamu menjawab semua pertanyaan dengan sempurna!","Kerja bagus! Kamu telah berhasil menyelesaikan tantangan ini tanpa cela!"],randomTexts=["Aduh, sayangnya kamu belum bisa menjawab semua pertanyaan. Semoga lebih beruntung lain kali!","Ups! Kamu belum berhasil menjawab semua pertanyaan. Semoga lebih beruntung di kesempatan berikutnya!","Sayang sekali! Kamu belum menjawab semua pertanyaan. Jangan khawatir, semoga lebih beruntung lain kali!","Hampir saja, tapi belum sempurna! Terus berlatih dan semoga beruntung untuk kuis selanjutnya!","Belum mencapai skor sempurna, tapi jangan menyerah! Semoga beruntung untuk kuis berikutnya!","Usaha yang bagus, tapi ada beberapa pertanyaan yang terlewat. Terus belajar dan semoga beruntung lain kali!","Kamu hampir mencapai tujuan! Terus berusaha, dan semoga beruntung untuk kuis berikutnya!"],randomImageURLs=["/game/newjeansquiz/img/njquiz1.jpg","/game/newjeansquiz/img/njquiz2.jpg","/game/newjeansquiz/img/njquiz3.jpg","/game/newjeansquiz/img/njquiz4.jpg","/game/newjeansquiz/img/njquiz5.jpg"],questions=[{question:"Siapa NewJeans yang bukan berasal dari Korea?",answers:["Hanni","Haerin","Minji","Hyein"],correctAnswer:"Hanni"},{question:"NewJeans berasal dari label Hybe di bawah naungan ADOR. Benar atau salah?",answers:["Salah","Benar","Tidak ada jawaban yang benar","Cowok yang salah"],correctAnswer:"Salah"},{question:"Siapakah member NewJeans yang paling tinggi?",answers:["Hanni","Minji","Hyein","Haerin"],correctAnswer:"Hyein"},{question:"Siapakah member NewJeans yang lahir pada tahun 2006?",answers:["Haerin","Hanni","Danielle","Minji"],correctAnswer:"Haerin"},{question:"Siapa nama asli dari Hanni?",answers:["Phạm Ngọc Anh","Phạm Ngọc Hân","Hân Thị Phạm","Lê Ngọc Hân"],correctAnswer:"Phạm Ngọc Hân"},{question:"Nama Korea dari Danielle Marsh adalah?",answers:["Mo Jihye","Mo Jihyo","Kang Jihye","Kim Dani"],correctAnswer:"Mo Jihye"},{question:"Di aplikasi mana biasanya NewJeans melakukan live streaming?",answers:["Instagram","Tiktok","Weverse","Phoning"],correctAnswer:"Phoning"},{question:"MV NewJeans yang memiliki Side A dan Side B?",answers:["Cool With You","ASAP","OMG","Hurt"],correctAnswer:"Cool With You"},{question:"'Eoneusae yeoreum jina gaeul. Gidaryeotji all this time.' adalah lirik dari lagu apa?",answers:["Ditto","ETA","New Jeans","Hype Boy"],correctAnswer:"Ditto"},{question:"Apa nama lighstick milik NewJeans?",answers:["BinkyBong","BunnyBong","CandyBong","SarangniBong"],correctAnswer:"BinkyBong"},{question:"Kapan NewJeans debut?",answers:["22 April 2022","22 Juli 2023","22 Juli 2022","22 April 2021"],correctAnswer:"22 Juli 2022"},{question:"Album kedua dari NewJeans berjudul apa?",answers:["SuperShy","Get Up","New Jeans","OMG"],correctAnswer:"Get Up"},{question:"Siapa itu Bbangsaz?",answers:["Minji-Haerin","Hanni-Haerin","Hanni-Hyein","Hanni-Minji"],correctAnswer:"Hanni-Minji"},{question:"Lagu NewJeans yang terpendek adalah?",answers:["ASAP","Hurt","Get Up","New Jeans"],correctAnswer:"Get Up"},{question:"Siapa itu Vanessa Kang?",answers:["Haerin","Hyein","Danielle","Minji"],correctAnswer:"Haerin"}];function showRandomFinishText(){const e=Math.floor(Math.random()*randomFinishTexts.length),n=randomFinishTexts[e],t=document.getElementById("finish");t.textContent=n,t.style.display="block"}function showRandomText(){const e=Math.floor(Math.random()*randomTexts.length),n=randomTexts[e];document.getElementById("uncompleted").textContent=n,uncompletedText.style.display="block"}function showRandomImage(){const e=Math.floor(Math.random()*randomImageURLs.length),n=randomImageURLs[e],t=document.querySelector(".result-image"),a=document.querySelector(".result-image-container");t.src=n,a.style.display="block"}function shuffleArray(e){for(let n=e.length-1;n>0;n--){const t=Math.floor(Math.random()*(n+1));[e[n],e[t]]=[e[t],e[n]]}}function shuffleQuestionsAndAnswers(){shuffleArray(questions);for(const e of questions)shuffleArray(e.answers)}function startTimer(){timerId=setInterval((function(){timeLeft--,timeLeft>=0?document.getElementById("timer").textContent=`Time left: ${timeLeft}`:(clearInterval(timerId),showNextModal())}),1e3)}shuffleQuestionsAndAnswers();const overlay=document.getElementById("overlay"),countdownElement=document.getElementById("countdown");function startCountdown(){let e=3;backDrop.style.display="block",countdownElement.textContent=e,countdownInterval=setInterval((()=>{e--,countdownElement.textContent=e,1===e&&(countdownElement.textContent="Mulai!",countdownElement.style.color="#8C52FF"),0===e&&(clearInterval(countdownInterval),countdownElement.textContent="",overlay.style.display="none",quizInfo.style.display="none",mainSection.style.display="flex",nextButton.style.display="flex",backDrop.style.display="none",showQuestion(currentQuestion),isQuizSession=!0,startTimer())}),1e3)}function showNameModal(){const e=document.getElementById("nameModal");backDrop.style.display="block",e.style.display="block"}function showlengthModal(){document.getElementById("lengthModal").style.display="block",backDrop.style.display="block"}function showWarningModal(){document.getElementById("warningModal").style.display="block",backDrop.style.display="block"}function showNextModal(){clearInterval(countdownInterval),clearInterval(timerId);document.getElementById("nextModal").style.display="block",backDrop.style.display="block",timeLeft=20}function showCertificate(){certificateContainer.style.display="block",userNameCertificate.textContent=userNameInput.value;const e=(new Date).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});dateText.textContent=e}function showQuestion(e){const n=questions[e];questionNumber.textContent=`No : ${e+1}/${questions.length}`,questionHeader.textContent=n.question,answerOptions.innerHTML="",n.answers.forEach(((e,n)=>{const t=document.createElement("div");t.className="answer",t.innerHTML=`\n            <input type="radio" name="answer" id="answer${n+1}" value="${e}">\n            <label for="answer${n+1}">${e}</label>\n        `,answerOptions.appendChild(t)})),e===questions.length?(clearInterval(timerId),nextButton.style.display="none",playAgainButton.style.display="flex"):(nextButton.style.display="flex",playAgainButton.style.display="none")}function captureCertificate(){html2canvas(document.querySelector(".certificate-container"),{logging:!0,letterRendering:1,useCORS:!0,scale:3}).then((e=>{const n=e.toDataURL("image/png"),t=document.createElement("a");t.download="sertifikat-bunnies(hnnxzee@github.io).png",t.href=n,t.click()}))}document.getElementById("closeModal").addEventListener("click",(function(){document.getElementById("nameModal").style.display="none",backDrop.style.display="none"})),document.getElementById("closelengthWarning").addEventListener("click",(function(){document.getElementById("lengthModal").style.display="none",backDrop.style.display="none"})),document.getElementById("closeModalWarning").addEventListener("click",(function(){document.getElementById("warningModal").style.display="none",backDrop.style.display="none"})),playButton.addEventListener("click",(function(){const e=userNameInput.value.trim();""!==e?e.length>25?showlengthModal():(shuffleQuestionsAndAnswers(),overlay.style.display="flex",startCountdown()):showNameModal()})),document.getElementById("nextModalButton").addEventListener("click",(function(){document.getElementById("nextModal").style.display="none",backDrop.style.display="none",currentQuestion++,clearInterval(countdownInterval),currentQuestion<questions.length?(showQuestion(currentQuestion),startTimer()):(mainSection.style.display="none",resultSection.style.display="block",playAgainButton.style.display="flex",scoreText.textContent=`Score = ${score}`,showRandomText(),showRandomImage())})),window.addEventListener("beforeunload",(function(e){isQuizSession&&(e.preventDefault(),e.returnValue="")})),nextButton.addEventListener("click",(function(){const e=document.querySelector('input[name="answer"]:checked');if(e){const n=e.value,t=questions[currentQuestion].correctAnswer;timeLeft=20,n===t&&score++,currentQuestion++,currentQuestion<questions.length?showQuestion(currentQuestion):score===questions.length?(showCertificate(),showRandomFinishText(),mainSection.style.display="none",downloadCert.style.display="flex",playAgainButton.style.display="flex",isQuizSession=!1,clearInterval(timerId),clearInterval(countdownInterval),confettiAnimation.style.display="flex",initConfetti(),render()):(mainSection.style.display="none",resultSection.style.display="block",playAgainButton.style.display="flex",clearInterval(timerId),clearInterval(countdownInterval),scoreText.textContent=`Score = ${score}/${questions.length}`,showRandomText(),showRandomImage())}else showWarningModal()})),playAgainButton.addEventListener("click",(function(){isQuizSession=!1,location.reload()}));const captureButton=document.getElementById("captureButton");captureButton.addEventListener("click",captureCertificate);