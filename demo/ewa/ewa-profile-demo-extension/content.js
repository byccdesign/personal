(() => {
  const sample = {
    firstName: 'Alex', middleName: 'Sample', lastName: 'Client', birthDate: '01/15/1990',
    gender: 'female', civilStatus: 'Single', nationality: 'Filipino', mobile: '+63 917 123 4567',
    email: 'alex.sample@example.test', occupation: 'Business owner', sourceFunds: 'Business income',
    monthlyIncome: '80000', employer: 'Sample Trading Co.', employerCountry: 'Philippines',
    employerStreet: '100 Demo Street, Barangay Sample', employerDistrict: 'Makati',
    employerRegion: 'NCR', employerCity: 'Makati City', employerZip: '1200',
    policyCount: '1', provider: 'Sun Life', aggregateInsured: '500000', aggregatePremium: '24000',
    futureEstate: '8000000', estateProvision: '2000000', taxLiability: '500000'
  };

  function setControl(control, value) {
    const prototype = control instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype :
      control instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
    if (setter) setter.call(control, value); else control.value = value;
    control.dispatchEvent(new Event('input', { bubbles: true }));
    control.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setByName(name, value) {
    const controls = [...document.querySelectorAll(`[name="${CSS.escape(name)}"]`)];
    const control = controls.find(item => !['radio','checkbox'].includes(item.type));
    if (control && value !== undefined) setControl(control, value);
  }

  function setRadio(name, value) {
    const control = document.querySelector(`input[type="radio"][name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`);
    if (!control) return;
    control.checked = true;
    control.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function populate() {
    const form = document.getElementById('clientProfile');
    if (!form) return { ok: false, error: 'Open create-lead-profile.html before populating.' };
    Object.entries(sample).forEach(([name,value]) => setByName(name, value));
    setRadio('employmentType', 'employed');
    setRadio('dnfbp', 'yes');
    setRadio('hasInsurance', 'yes');
    setRadio('investDuration', '4-6');
    setRadio('investGoal', 'moderate');
    setRadio('financialKnowledge', 'satisfactory');
    setRadio('investExperience', '1-3');
    setRadio('investFunds', '20');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return { ok: true };
  }

  chrome.runtime.onMessage.addListener((message, _sender, respond) => {
    if (message?.type === 'EWA_POPULATE_DEMO') respond(populate());
  });
})();
