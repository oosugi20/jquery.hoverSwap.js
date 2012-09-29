describe('$.fn.hoverSwap', function () {
	it('mouseenterするとオーバー画像に変わること', function () {
		var $img = $('<img src="../dummy_img_01.jpg">');
		$img.hoverSwap();
		$img.trigger('mouseenter');
		expect($img.attr('src')).to.be.equal('../dummy_img_01_ov.jpg');
	});

	it('mouseenter後にmouseleaveすると通常画像に変わること', function () {
		var $img = $('<img src="../dummy_img_01.jpg">');
		$img.hoverSwap();
		$img.trigger('mouseenter');
		$img.trigger('mouseleave');
		expect($img.attr('src')).to.be.equal('../dummy_img_01.jpg');
	});

	it('2回実行してもmouseenterでswapToが1回しか呼ばれないこと', function () {
		var $img  = $('<img src="../dummy_img_01.jpg">');
		$img.hoverSwap();
		$img.hoverSwap();
		var spy = sinon.stub($.data($img[0], 'hoverSwap'), 'swapTo');
		$img.trigger('mouseenter');
		expect(spy.calledOnce).to.be.ok();
	});

	it('復数の画像があっても、mouseenterしたものだけ変わること', function () {
		var $img  = $('<img src="../dummy_img_01.jpg">');
		var $img2 = $('<img src="../dummy_img_02.jpg">');
		var $imgs = $img.add($img2);
		$imgs.hoverSwap();
		$img2.trigger('mouseenter');
		expect($img.attr('src')).to.be.equal('../dummy_img_01.jpg');
		expect($img2.attr('src')).to.be.equal('../dummy_img_02_ov.jpg');
	});

	it('動的に画像が変わって再実行した場合も正しいオーバー画像が呼ばれること', function () {
		var $img = $('<img src="../dummy_img_01.jpg">');
		$img.hoverSwap();
		$img.trigger('mouseenter');
		expect($img.attr('src')).to.be.equal('../dummy_img_01_ov.jpg');

		$img.attr('src', '../dummy_img_02.jpg');
		$img.hoverSwap();
		$img.trigger('mouseenter');
		expect($img.attr('src')).to.be.equal('../dummy_img_02_ov.jpg');
	});

	it('別途動的にオーバー画像に変えられたら再実行しなければ動かないこと', function () {
		var $img = $('<img src="../dummy_img_01.jpg">');
		$img.hoverSwap();
		var spy = sinon.stub($.data($img[0], 'hoverSwap'), 'swapTo');
		$img.attr('src', '../dummy_img_01_ov.jpg');
		$img.trigger('mouseenter');
		expect($img.attr('src')).to.be.equal('../dummy_img_01_ov.jpg');
		expect(spy.calledOnce).to.not.be.ok();
		$img.trigger('mouseleave');
		expect($img.attr('src')).to.be.equal('../dummy_img_01_ov.jpg');
		expect(spy.calledOnce).to.not.be.ok();
	});
});
