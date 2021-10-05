const SettingsBill = require('../settings-bill');
let assert = require("assert");

describe('Checking Default settings values', function(){
    const settingsBill = SettingsBill();

    it('Call should be having a default value equal to R2.75', function(){
        assert.equal('2.75', settingsBill.getSettings().callCost);
    });

    it('Sms should be having a default value equal to R0.75', function(){
        assert.equal('0.75', settingsBill.getSettings().smsCost);
    });

    it('Warning level should be having a default value equal to R20', function(){
        assert.equal('20', settingsBill.getSettings().warningLevel);
    });

    it('Critical level should be having a default value equal to R30', function(){
        assert.equal('30', settingsBill.getSettings().criticalLevel);
    });

});

describe('Updating the settings value', function(){
    const settingsBill = SettingsBill();
    settingsBill.setSettings({
        callCost: '5.2',
        smsCost: '2.2',
        warningLevel: '35',
        criticalLevel: '45'
    });
    
    it('Call should be having a default value equal to R5.5', function(){
        assert.equal('5.2', settingsBill.getSettings().callCost);
    });

    it('Sms should be having a default value equal to R2.3', function(){
        assert.equal('2.2', settingsBill.getSettings().smsCost);
    });

    it('Warning level should be having a default value equal to R30', function(){
        assert.equal('35', settingsBill.getSettings().warningLevel);
    });

    it('Critical level should be having a default value equal to R50', function(){
        assert.equal('45', settingsBill.getSettings().criticalLevel);
    });

});

describe('Check callTotal, smsTotal and grandTotal using for each type', function(){
    const settingsBill = SettingsBill();
    settingsBill.recordAction('call');
    it('1 call should return a value of R2.75 and a grandtotal equal to R2.75', function(){
        assert.equal('2.75', settingsBill.totals().callTotal);
        assert.equal('2.75', settingsBill.totals().grandTotal);
    });

    const settingsBill1 = SettingsBill();
    settingsBill1.recordAction('sms');
    it('1-sms should return a value of R0.75 and a grandtotal equal to R0.75', function(){
        assert.equal('0.75', settingsBill1.totals().smsTotal);
        assert.equal('0.75', settingsBill1.totals().grandTotal);
    });
});

describe('Check callTotal, smsTotal and grandTotal with different combinations types', function(){
    const settingsBill = SettingsBill();
    settingsBill.recordAction('call');
    settingsBill.recordAction('sms');
    it('1 call and 1 sms should return a value of R2.75 for callTotal, R0.75 for smsTotal and a grandtotal of R3.5', function(){
        assert.equal('2.75', settingsBill.totals().callTotal);
        assert.equal('0.75', settingsBill.totals().smsTotal);
        assert.equal('3.5', settingsBill.totals().grandTotal);
    });

    const settingsBill1 = SettingsBill();
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
   
    
   
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    it('3 call and 3 sms should return a value of R8.25 for callTotal, R2.25 for smsTotal and a grandtotal of R10.5', function(){
        assert.equal('8.25', settingsBill1.totals().callTotal);
        assert.equal('2.25', settingsBill1.totals().smsTotal);
        assert.equal('10.5', settingsBill1.totals().grandTotal);
    });

});

describe('Checking callTotal, smsTotal and grandTotal with different combo types and updated settings', function(){
    const settingsBill = SettingsBill();
    settingsBill.setSettings({
        callCost: '5.5',
        smsCost: '2.5',
        warningLevel: '30',
        criticalLevel: '50'
    });
    settingsBill.recordAction('call');
    settingsBill.recordAction('sms');
    it('1 call and 1 sms should return a value of R5.50 for callTotal, R2.50 for smsTotal and a grandtotal of R8.0', function(){
        assert.equal('5.5', settingsBill.totals().callTotal);
        assert.equal('2.5', settingsBill.totals().smsTotal);
        assert.equal('8', settingsBill.totals().grandTotal);
    });

    const settingsBill1 = SettingsBill();
    settingsBill1.setSettings({
        callCost: '4',
        smsCost: '2',
        warningLevel: '30',
        criticalLevel: '50'
    });


    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    it('2 call and 2 sms should return a value of R8.0 for callTotal, R4.0 for smsTotal and a grandtotal of R12.0', function(){
        assert.equal('8', settingsBill1.totals().callTotal);
        assert.equal('4', settingsBill1.totals().smsTotal);
        assert.equal('12', settingsBill1.totals().grandTotal);
    });

});

describe('Checking warningLevels and criticalLevels with different combo types and updated settings', function(){
    const settingsBill = SettingsBill();
    settingsBill.setSettings({
        callCost: '5.5',
        smsCost: '2.5',
        warningLevel: '30',
        criticalLevel: '50'
    });
    settingsBill.recordAction('call');
    settingsBill.recordAction('call');
    settingsBill.recordAction('call');
    settingsBill.recordAction('call');
    settingsBill.recordAction('sms');
    settingsBill.recordAction('sms');
    settingsBill.recordAction('sms');
    settingsBill.recordAction('sms');
    it('warningLevel should return True and criticalLevel return False', function(){
        assert.equal(true, settingsBill.hasReachedWarningLevel());
        assert.equal(false, settingsBill.hasReachedCriticalLevel());
    });

    const settingsBill1 = SettingsBill();
    settingsBill1.setSettings({
        callCost: '5.5',
        smsCost: '2.5',
        warningLevel: '30',
        criticalLevel: '50'
    });



    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    settingsBill1.recordAction('sms');
    
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');
    settingsBill1.recordAction('call');




    
    it('warningLevel should return False and criticalLevel should return True', function(){
        assert.equal(false, settingsBill1.hasReachedWarningLevel());
        assert.equal(true, settingsBill1.hasReachedCriticalLevel());
    });

});
