import { sprintf } from 'sprintf-js';

const { passwordPolicy: PasswordPolicyMap } = prestashop.themeSelectors;

const PASSWORD_POLICY_ERROR = 'The password policy elements are undefined.';

const getPasswordStrengthFeedback = (
  strength,
) => {
  switch (strength) {
    case 0:
      return {
        color: 'bg-danger',
      };

    case 1:
      return {
        color: 'bg-danger',
      };

    case 2:
      return {
        color: 'bg-warning',
      };

    case 3:
      return {
        color: 'bg-success',
      };

    case 4:
      return {
        color: 'bg-success',
      };

    default:
      throw new Error('Invalid password strength indicator.');
  }
};

const watchPassword = async (
  elementInput,
  feedbackContainer,
  hints,
) => {
  const { prestashop } = window;
  const passwordValue = elementInput.value;
  const elementIcon = feedbackContainer.querySelector(PasswordPolicyMap.requirementScoreIcon);
  const result = await prestashop.checkPasswordScore(passwordValue);
  const feedback = getPasswordStrengthFeedback(result.score);
  const passwordLength = passwordValue.length;
  const popoverContent = [];

  $(elementInput).popover('dispose');

  feedbackContainer.style.display = passwordValue === '' ? 'none' : 'block';

  if (result.feedback.warning !== '') {
    if (result.feedback.warning in hints) {
      popoverContent.push(hints[result.feedback.warning]);
    }
  }

  result.feedback.suggestions.forEach((suggestion) => {
    if (suggestion in hints) {
      popoverContent.push(hints[suggestion]);
    }
  });

  $(elementInput).popover({
    html: true,
    placement: 'top',
    content: popoverContent.join('<br/>'),
  }).popover('show');

  const passwordLengthValid = passwordLength >= parseInt(elementInput.dataset.minlength, 10)
    && passwordLength <= parseInt(elementInput.dataset.maxlength, 10);
  const passwordScoreValid = parseInt(elementInput.dataset.minscore, 10) <= result.score;

  feedbackContainer.querySelector(PasswordPolicyMap.requirementLengthIcon).classList.toggle(
    'text-success',
    passwordLengthValid,
  );

  elementIcon.classList.toggle(
    'text-success',
    passwordScoreValid,
  );

  // Change input border color depending on the validity
  elementInput
    .classList.remove('border-success', 'border-danger');
  elementInput
    .classList.add(passwordScoreValid && passwordLengthValid ? 'border-success' : 'border-danger');
  elementInput
    .classList.add('form-control', 'border');

  const percentage = (result.score * 20) + 20;
  const progressBar = feedbackContainer.querySelector(PasswordPolicyMap.progressBar);

  // increase and decrease progress bar
  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.classList.remove('bg-success', 'bg-danger', 'bg-warning');
    progressBar.classList.add(feedback.color);
  }
};

// Not testable because it manipulates SVG elements, unsupported by JSDom
const usePasswordPolicy = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const inputColumn = element?.querySelector(PasswordPolicyMap.inputColumn);
    const elementInput = element?.querySelector('input');
    const templateElement = document.createElement('div');
    const feedbackTemplate = document.querySelector(PasswordPolicyMap.template);
    let feedbackContainer;

    if (feedbackTemplate && element && inputColumn && elementInput) {
      templateElement.innerHTML = feedbackTemplate.innerHTML;
      inputColumn.append(templateElement);
      feedbackContainer = element.querySelector(PasswordPolicyMap.container);

      if (feedbackContainer) {
        const hintElement = document.querySelector(PasswordPolicyMap.hint);

        if (hintElement) {
          const hints = JSON.parse(hintElement.innerHTML);

          // eslint-disable-next-line max-len
          const passwordRequirementsLength = feedbackContainer.querySelector(PasswordPolicyMap.requirementLength);
          // eslint-disable-next-line max-len
          const passwordRequirementsScore = feedbackContainer.querySelector(PasswordPolicyMap.requirementScore);
          const passwordLengthText = passwordRequirementsLength?.querySelector('span');
          const passwordRequirementsText = passwordRequirementsScore?.querySelector('span');

          if (passwordLengthText && passwordRequirementsLength && passwordRequirementsLength.dataset.translation) {
            passwordLengthText.innerText = sprintf(
              passwordRequirementsLength.dataset.translation,
              elementInput.dataset.minlength,
              elementInput.dataset.maxlength,
            );
          }

          if (passwordRequirementsText && passwordRequirementsScore && passwordRequirementsScore.dataset.translation) {
            passwordRequirementsText.innerText = sprintf(
              passwordRequirementsScore.dataset.translation,
              hints[elementInput.dataset.minscore],
            );
          }

          // eslint-disable-next-line max-len
          elementInput.addEventListener('keyup', () => watchPassword(elementInput, feedbackContainer, hints));
          elementInput.addEventListener('blur', () => {
            $(elementInput).popover('dispose');
          });
        }
      }
    }

    if (element) {
      return {
        element,
      };
    }

    return {
      error: new Error(PASSWORD_POLICY_ERROR),
    };
  });
};

export default usePasswordPolicy;
