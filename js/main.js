// index
$("#indexForm").validate({
	submitHandler: function () { submit($("#indexForm").serializeArray()) },
	
	rules: {
		
		in1:{required: true},
    in2:{required: true}
	},
	//錯誤提示
	messages: {
		// EMAIL: {email: "請輸入正確格式的電子郵件"}
	},

});


// 日期檢核(yyyyMMdd)
jQuery.validator.addMethod("yyyyMMdd", function (value, element) {
	return this.optional(element) || isDate8(value);
}, "日期格式錯誤");
// 手機格式檢核
jQuery.validator.addMethod("mobile", function (value, element) {
	var mobileValid = new RegExp(/^09\d{8}$/).test(value);
	return this.optional(element) || mobileValid;
}, "手機格式錯誤(請輸入負責人/簽約人的行動電話)");
// 身分證格式檢核
jQuery.validator.addMethod("numberId", function (value, element) {
	return this.optional(element) || taiwanIdValidator.isNationalIdentificationNumberValid(value);
}, "身分證格式錯誤");
// 統一編號格式檢核
jQuery.validator.addMethod("gui", function (value, element) {
	return this.optional(element) || taiwanIdValidator.isGuiNumberValid(value);
}, "統一編號格式錯誤");
// 信箱格式檢核
jQuery.validator.addMethod("Email", function (value, element) {
	var EmailValid = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
	return this.optional(element) || EmailValid;
}, "電子郵件格式錯誤");
// 身分證/統編格式檢核
jQuery.validator.addMethod("idGui", function (value, element, params) {
	var word1 = value.substring(0, 1);
	var isId = new RegExp("[A-Za-z]+").test(word1);
	var isGui = new RegExp(/[0-9]/).test(word1);
	if (isId) {
		return this.optional(element) || taiwanIdValidator.isNationalIdentificationNumberValid(value);
	}
	if (isGui) {
		return this.optional(element) || taiwanIdValidator.isGuiNumberValid(value);
	}

}, '身分證/統編格式錯誤');

// yyyyMMdd
function isDate8(sDate) {
	if (!/^[0-9]{8}$/.test(sDate)) {
		return false;
	}
	var year, month, day;
	year = sDate.substring(0, 4);
	month = sDate.substring(4, 6);
	day = sDate.substring(6, 8);
	var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	if (year < 1700 || year > 2500) return false
	if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
	if (month < 1 || month > 12) return false
	if (day < 1 || day > iaMonthDays[month - 1]) return false
	return true
}

// 資本額去掉開頭0
noZero($('#CAPITAL'));

// 去掉 數字前面的0
function noZero($dom) {
	$dom.on('change', function () {
		$(this).val($(this).val().replace(/\D|(^0+(?=\d))/g, ''));
	});
}

// 去掉copy值的disabled 讓serializeArray 能取到資料
function noDisabled($myform){
	var disabled = $myform.find('.js-copy').removeAttr('disabled');
	var arrayData = $myform.serializeArray();
	disabled.attr('disabled','disabled');
	return arrayData;
}