describe('$.fn.hoverSwap', function () {
	var html = [
		'<img src="../dummy_img_01.jpg">'
	  , '<img src="../dummy_img_02.jpg">'
	  , '<img src="../dummy_img_03.gif">'
	  , '<img src="../dummy_img_04.png">'
	  , '<img src="../dummy_img_02_ov.jpg">'
	].join('');

	var $html, $img, hoverSwap;

	//beforeEach(function () {
	//	$html = $(html);
	//	$img = $html.find('img');
	//});

	describe('_setSrcExtention', function () {
		it('数種類の拡張子があっても正しくセットされていること', function () {
			var $jpg = $('<img src="../dummy_img_01.jpg">')
			  , $jpeg = $('<img src="../dummy_img_08.jpeg">')
			  , $gif = $('<img src="../dummy_img_03.gif">')
			  , $png = $('<img src="../dummy_img_04.png">')
			  , $imgs = $jpg.add($gif).add($png).add($jpeg)
			  ;
			$imgs.hoverSwap();
			expect($.data($jpg[0], 'hoverSwap').src_extention).to.be.equal('.jpg');
			expect($.data($jpeg[0], 'hoverSwap').src_extention).to.be.equal('.jpeg');
			expect($.data($gif[0], 'hoverSwap').src_extention).to.be.equal('.gif');
			expect($.data($png[0], 'hoverSwap').src_extention).to.be.equal('.png');
		});

		it('`.` が複数ついていても正しくセットされていること', function () {
			var $img = $('<img src="../hoge.bk.jpg">');
			$img.hoverSwap();
			expect($img.data('hoverSwap').src_extention).to.equal('.jpg');
		});
	});


	describe('isOverSrc', function () {
		it('オーバー時の画像であれば `true` を返すこと', function () {
			var $img = $('<img src="../dummy_img_01_ov.jpg">');
			$img.hoverSwap();
			expect($.data($img[0], 'hoverSwap').isOverSrc()).to.be.equal(true);
		});

		it('オーバー時の画像でなければ `false` を返すこと', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			$img.hoverSwap();
			expect($.data($img[0], 'hoverSwap').isOverSrc()).to.be.equal(false);
		});

		it('動的にsrcが変更され、オーバー状態になっている時にも `true` を返すこと', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			$img.hoverSwap();
			$img.attr('src', '../dummy_img_01_ov.jpg');
			expect($.data($img[0], 'hoverSwap').isOverSrc()).to.be.equal(true);
		});

		it('引数に文字列を渡した場合は、その文字列で、渡されてなければ現在のsrcで判別すること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			$img.hoverSwap();
			expect($.data($img[0], 'hoverSwap').isOverSrc()).to.be.equal(false);
			expect($.data($img[0], 'hoverSwap').isOverSrc('../dummy_img_01_ov.jpg')).to.be.equal(true);
			$img.attr('src', '../dummy_img_01_ov.jpg');
			expect($.data($img[0], 'hoverSwap').isOverSrc()).to.be.equal(true);
			expect($.data($img[0], 'hoverSwap').isOverSrc('../dummy_img_01_ov.jpg')).to.be.equal(true);
		});
	});

	describe('_setNormalSrc', function () {
		it('`normal_src` がセットされていること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			$img.hoverSwap();
			expect($.data($img[0], 'hoverSwap').normal_src).to.be.ok();
		});

		it('オーバー時の画像だったときも正しく通常時のパスが取得されていること', function () {
			var $img = $('<img src="../dummy_img_01_ov.jpg">');
			$img.hoverSwap();
			expect($.data($img[0], 'hoverSwap').normal_src).to.be.equal('../dummy_img_01.jpg');
		});
	});
});