window.onload = function () {
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');
			var size = 250;
			var detector;
			var classifier = objectdetect.frontalface;

			function detectFaces(canvas) {
				// Detect faces in the image:
				var rects = detector.detect(canvas);

				// Draw rectangles around detected faces:
				for (var i = 0; i < rects.length; ++i) {
					var coord = rects[0];
					context.beginPath();
					context.lineWidth = 1;
					context.strokeStyle = 'rgba(0, 255, 255, 0.75)';
					context.rect(coord[0], coord[1] - coord[2], coord[2], coord[3]);
					//context.stroke();
				}
				img1 = new Image();
				img1.src = "img/crown-5.png";
				img1.onload = function () {
					context.drawImage(img1, coord[0], coord[1] - coord[2], coord[2], coord[3]);
				}
			}
			function loadImage(src) {
				image = new Image();
				image.onload = function () {
					canvas.width = ~~(size * image.width / image.height);
					canvas.height = ~~(size);
					canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
					detector = new objectdetect.detector(canvas.width, canvas.height, 1.2, classifier);
					detectFaces(canvas);
				}

				image.src = src;
			}
			function handleFileSelect(e) {
				var file = e.target.files[0];
				var reader = new FileReader();

				reader.onload = function (e) {
					loadImage(e.target.result);
				};
				reader.readAsDataURL(file);
			}

			function handleClassifierSelect(e) {
				classifier = objectdetect[e.target.value];
				detector = new objectdetect.detector(canvas.width, canvas.height, 1.2, classifier);
				canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
				detectFaces(canvas);
			}
			document.getElementById('file').addEventListener('change', handleFileSelect, false);
			document.getElementById('select').addEventListener('change', handleClassifierSelect, false);
			loadImage('img/face-1.jpg');
		}