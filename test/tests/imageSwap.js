describe('ImageSwap', function () {
	describe('_setSrcExtention', function () {
		it('数種類の拡張子があっても正しくセットされていること', function () {
			var $jpg = $('<img src="../dummy_img_01.jpg">')
			  , $jpeg = $('<img src="../dummy_img_08.jpeg">')
			  , $gif = $('<img src="../dummy_img_03.gif">')
			  , $png = $('<img src="../dummy_img_04.png">')
			  , $imgs = $jpg.add($gif).add($png).add($jpeg)
			  ;
			var swap1 = new ImageSwap($jpg[0]);
			var swap2 = new ImageSwap($jpeg[0]);
			var swap3 = new ImageSwap($gif[0]);
			var swap4 = new ImageSwap($png[0]);
			expect(swap1.src_extention).to.be.equal('.jpg');
			expect(swap2.src_extention).to.be.equal('.jpeg');
			expect(swap3.src_extention).to.be.equal('.gif');
			expect(swap4.src_extention).to.be.equal('.png');
		});

		it('`.` が複数ついていても正しくセットされていること', function () {
			var $img = $('<img src="../hoge.bk.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.src_extention).to.equal('.jpg');
		});
	});


	describe('isOverSrc', function () {
		it('オーバー時の画像であれば `true` を返すこと', function () {
			var $img = $('<img src="../dummy_img_01_ov.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.isOverSrc()).to.be.equal(true);
		});

		it('オーバー時の画像でなければ `false` を返すこと', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.isOverSrc()).to.be.equal(false);
		});

		it('動的にsrcが変更され、オーバー状態になっている時にも `true` を返すこと', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			$img.attr('src', '../dummy_img_01_ov.jpg');
			expect(swap.isOverSrc()).to.be.equal(true);
		});

		it('引数に文字列を渡した場合はその文字列・渡されてなければ現在のsrc、で判別すること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.isOverSrc()).to.be.equal(false);
			expect(swap.isOverSrc('../dummy_img_01_ov.jpg')).to.be.equal(true);

			$img.attr('src', '../dummy_img_01_ov.jpg');
			expect(swap.isOverSrc()).to.be.equal(true);
			expect(swap.isOverSrc('../dummy_img_01_ov.jpg')).to.be.equal(true);
		});
	});


	describe('_setNormalSrc', function () {
		it('`normal_src` が正しくセットされていること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.normal_src).to.be.equal('../dummy_img_01.jpg');
		});


		context('初期状態がオーバー時の画像だった場合', function () {
			it('正しく通常時のパスが取得されていること', function () {
				var $img = $('<img src="../dummy_img_01_ov.jpg">');
				var swap = new ImageSwap($img[0]);
				expect(swap.normal_src).to.be.equal('../dummy_img_01.jpg');
			});

			it('複数の拡張子で正しく取得されていること', function () {
				var $jpg = $('<img src="../dummy_img_01_ov.jpg">')
				  , $jpeg = $('<img src="../dummy_img_08_ov.jpeg">')
				  , $gif = $('<img src="../dummy_img_03_ov.gif">')
				  , $png = $('<img src="../dummy_img_04_ov.png">')
				  , $imgs = $jpg.add($gif).add($png).add($jpeg)
				  ;
				var swap1 = new ImageSwap($jpg[0]);
				var swap2 = new ImageSwap($jpeg[0]);
				var swap3 = new ImageSwap($gif[0]);
				var swap4 = new ImageSwap($png[0]);
				expect(swap1.normal_src).to.be.equal('../dummy_img_01.jpg');
				expect(swap2.normal_src).to.be.equal('../dummy_img_08.jpeg');
				expect(swap3.normal_src).to.be.equal('../dummy_img_03.gif');
				expect(swap4.normal_src).to.be.equal('../dummy_img_04.png');
			});

			it('オプションでオーバー時の接尾辞が変えられていても正しく取得されていること', function () {
				var $img = $('<img src="../dummy_img_05_on.png">');
				var swap = new ImageSwap($img[0], {
					over_suffix: '_on'
				});
				expect(swap.normal_src).to.be.equal('../dummy_img_05.png');
			});

			it('オプションで通常時の接尾辞が変えられているかつオーバーの接尾辞も変えられていても正しく取得されていること', function () {
				var $img = $('<img src="../dummy_img_07_ovr.png">');
				var swap = new ImageSwap($img[0], {
					over_suffix: '_ovr'
				  , normal_suffix: '_off'
				});
				expect(swap.normal_src).to.be.equal('../dummy_img_07_off.png');
			});
		});

		context('初期状態がカレント画像だった場合', function () {
			it('正しく通常時のパスが取得されていること', function () {
				var $img = $('<img src="../dummy_img_01_cr.jpg">');
				var swap = new ImageSwap($img[0]);
				expect(swap.normal_src).to.be.equal('../dummy_img_01.jpg');
			});
		});
	});


	describe('_setCurrentSrc', function () {
		it('`current_src` が正しくセットされていること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.current_src).to.be.equal('../dummy_img_01_cr.jpg');
		});

		it('オプションでカレントの接尾辞が変えられていても正しくセットされていること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0], { current_suffix: '_cur' });
			expect(swap.current_src).to.be.equal('../dummy_img_01_cur.jpg');
		});
	});


	describe('noExtentionSrc', function () {
		it('拡張子を除いたパスが返されること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.noExtentionSrc('../dummy_img_01.jpg')).to.be.equal('../dummy_img_01');
			expect(swap.noExtentionSrc('../dummy_img_01_ov.jpg')).to.be.equal('../dummy_img_01_ov');
		});

		it('複数の拡張子で正しく取得されていること', function () {
			var $jpg = $('<img src="../dummy_img_01_ov.jpg">')
			  , $jpeg = $('<img src="../dummy_img_08_ov.jpeg">')
			  , $gif = $('<img src="../dummy_img_03_ov.gif">')
			  , $png = $('<img src="../dummy_img_04_ov.png">')
			  , $imgs = $jpg.add($gif).add($png).add($jpeg)
			  ;
			var swap1 = new ImageSwap($jpg[0]);
			var swap2 = new ImageSwap($jpeg[0]);
			var swap3 = new ImageSwap($gif[0]);
			var swap4 = new ImageSwap($png[0]);
			expect(swap1.noExtentionSrc('../dummy_img_01.jpg')).to.be.equal('../dummy_img_01');
			expect(swap2.noExtentionSrc('../dummy_img_08.jpeg')).to.be.equal('../dummy_img_08');
			expect(swap3.noExtentionSrc('../dummy_img_03.gif')).to.be.equal('../dummy_img_03');
			expect(swap4.noExtentionSrc('../dummy_img_04.png')).to.be.equal('../dummy_img_04');
		});
	});


	describe('_setOverSrc', function () {
		it('正しくオーバー時のパスがセットされていること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			expect(swap.over_src).to.be.equal('../dummy_img_01_ov.jpg');
		});

		context('初期状態がオーバー時の画像だった場合', function () {
			it('正しくオーバー時のパスがセットされていること', function () {
				var $img = $('<img src="../dummy_img_01_ov.jpg">');
				var swap = new ImageSwap($img[0]);
				expect(swap.over_src).to.be.equal('../dummy_img_01_ov.jpg');
			});
		});
	});


	describe('swapTo', function () {
		it('`over` を引数に渡すと `_swapOver` が呼ばれること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			var spy = sinon.stub(swap, '_swapOver');
			swap.swapTo('over');
			expect(spy.calledOnce).to.be.ok();
		});

		it('`normal` を引数に渡すと `_swapNormal` が呼ばれること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			var spy = sinon.stub(swap, '_swapNormal');
			swap.swapTo('normal');
			expect(spy.calledOnce).to.be.ok();
		});

		it('`current` を引数に渡すと `_swapCurrent` が呼ばれること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			var spy = sinon.stub(swap, '_swapCurrent');
			swap.swapTo('current');
			expect(spy.calledOnce).to.be.ok();
		});
	});


	describe('_swapOver', function () {
		it('画像のsrcがover_srcに変わること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			var ov = swap.over_src;
			expect(ov).to.be.equal('../dummy_img_01_ov.jpg');
			swap._swapOver();
			expect($img.attr('src')).to.be.equal(ov);
		});
	});


	describe('_swapNormal', function () {
		it('画像のsrcがnormal_srcに変わること', function () {
			var $img = $('<img src="../dummy_img_01_ov.jpg">');
			var swap = new ImageSwap($img[0]);
			var nr = swap.normal_src;
			expect(nr).to.be.equal('../dummy_img_01.jpg');
			swap._swapNormal();
			expect($img.attr('src')).to.be.equal(nr);
		});
	});


	describe('_swapCurrent', function () {
		it('画像のsrcがcurrent_srcに変わること', function () {
			var $img = $('<img src="../dummy_img_01.jpg">');
			var swap = new ImageSwap($img[0]);
			var cr = swap.current_src;
			expect(cr).to.be.equal('../dummy_img_01_cr.jpg');
			swap._swapCurrent();
			expect($img.attr('src')).to.be.equal(cr);
		});
	});


	describe('_preloadOver', function () {
		it('オーバー画像が読み込まれること', function () {
			// no idea for test
		});
	});


	describe('_preloadCurrent', function () {
		it('カレント画像が読み込まれること', function () {
			// no idea for test
		});
	});
});
