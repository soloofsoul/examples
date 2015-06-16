	$(function () {
	//How fast to change frames in milliseconds
	LIFE.speed = 1000;

	//Size of the displayed field and initial matrix
	LIFE.width = 25;
	LIFE.height = 17;

	LIFE.play = function () {
		$("#play").hide();
		$("#pause").show();
		clearTimeout(LIFE.timeout);
		LIFE.draw.updateGrid(LIFE.calc.matrixTick().getMatrix());
		LIFE.timeout = setTimeout(function () {
			LIFE.play();
		}, LIFE.speed);
	};

	LIFE.pause = function () {
		clearTimeout(LIFE.timeout);
		$("#pause").hide();
		$("#play").show();
	};

	LIFE.patternHooker = function (pattern) {
		LIFE.pause();
		LIFE.draw.updateGrid(LIFE.calc.addPattern(pattern).getMatrix());
		return false;
	};


	LIFE.manualDraw = function (id) {
		LIFE.draw.updateGrid(LIFE.calc.changeCell(id).getMatrix());
	};

	//Initial position of the speed slider control
	LIFE.defaultSpeedSliderSetting = 2;

	LIFE.setSpeed = function (val) {
		LIFE.speed = 1000 / (Math.pow(2, val));
	};

	LIFE.setSpeed(LIFE.defaultSpeedSliderSetting);

	LIFE.init = function () {
		document.getElementById("life").appendChild(
				LIFE.draw.drawTable(LIFE.width, LIFE.height).updateGrid(
						LIFE.calc.initMatrix(LIFE.width, LIFE.height).getMatrix()
				).getTable()
		);
	};
	LIFE.init();


	$("#clear").click(function () {
		LIFE.calc.clearMatrix();
		return false;
	});
	$("#play").click(function () {
		LIFE.play();
		return false;
	});
	$("#pause").click(function () {
		LIFE.pause();
		return false;
	});
});