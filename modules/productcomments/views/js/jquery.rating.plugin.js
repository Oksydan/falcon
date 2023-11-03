
const starRating = (element, grade = null, max = 5) => {
  const STAR_CLASS = 'star';
  const STAR_ACTIVE_CLASS = 'star-on';
  const INITIALIZED_CLASS = 'grade-initialized';

  if (!element) {
    console.warn('No element provided');
    return;
  }

  const tempGrade = grade || element.dataset.grade;
  const ratingGrade = Number.parseFloat(tempGrade);

  if (!ratingGrade || Number.isNaN(ratingGrade)) {
    console.warn('No grade provided or grade is not a number');
    return;
  }


  const getGradeParsed = (gradeToNormalize) => {
    const returnValue = gradeToNormalize;

    if (returnValue > max) {
      return max;
    }

    return returnValue;
  };
  const calcPercentageWidth = (value) => {
    const gradeParsed = getGradeParsed(value);

    return (gradeParsed / max) * 100;
  };

  const buildStarsTemplate = () => {
    const ratingFull = document.createElement('div');
    ratingFull.classList.add('star-content', 'star-content-full');
    const ratingEmpty = document.createElement('div');
    ratingEmpty.classList.add('star-content', 'star-content-empty');

    for (let i = 1; i <= max; i += 1) {
      const star = document.createElement('span');
      star.classList.add(STAR_CLASS);
      star.dataset.grade = i;
      const starCopy = star.cloneNode(true);

      ratingEmpty.appendChild(star);

      starCopy.classList.add(STAR_ACTIVE_CLASS);

      ratingFull.appendChild(starCopy);
    }

    const gradeCalculated = getGradeParsed(ratingGrade);
    const percentage = calcPercentageWidth(gradeCalculated);

    ratingFull.style.width = `${percentage}%`;

    element.appendChild(ratingEmpty);
    element.appendChild(ratingFull);
  };

  const updateStars = () => {
    const gradeCalculated = getGradeParsed(ratingGrade);
    const percentage = calcPercentageWidth(gradeCalculated);
    const ratingFull = element.querySelector('.star-content-full');
    ratingFull.style.width = `${percentage}%`;
  };

  if (element.classList.contains(INITIALIZED_CLASS)) {
    updateStars();
  } else {
    buildStarsTemplate();
  }

  element.classList.add(INITIALIZED_CLASS);
};

const starRatingInput = (element, inputName, grade = null, max = 5) => {
  const tempGrade = grade || element.dataset.grade;
  const ratingGrade = Number.parseFloat(tempGrade);

  if (!ratingGrade || Number.isNaN(ratingGrade)) {
    console.warn('No grade provided or grade is not a number');
    return;
  }

  let currentGrade = ratingGrade;

  const INPUT_INIT_CLASS = 'grade-input-initialized';
  const INPUT_CLASS = 'js-grade-input';

  const handleInputChange = ({target}) => {
    const targetGrade = target.value;
    currentGrade = targetGrade;

    starRating(element, targetGrade, max);
  };

  const buildInput = (name, value) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = value;
    input.style.display = 'none';
    input.classList.add(INPUT_CLASS);

    if (value === currentGrade) {
      input.checked = true;
    }

    return input;
  };

  const buildTemplate = () => {
    for (let i = 1; i <= max; i += 1) {
      const input = buildInput(inputName, i);
      element.appendChild(input);
    }
  };

  const handleMouseHoverEvent = ({target, type}) => {
    if (type === 'mouseout') {
      starRating(element, currentGrade, max);
    } else {
      const starGrade = target.dataset.grade;
      starRating(element, starGrade, max);
    }
  };

  const refreshInputsValue = (value) => {
    const inputs = element.querySelectorAll(`.${INPUT_CLASS}`);

    each(inputs, (input) => {
      if (Number.parseInt(input.value, 10) === Number.parseInt(value, 10)) {
        input.checked = true;
      }
    });
  }

  const handleMouseClickEvent = ({target}) => {
    const newGrade = target.dataset.grade;

    currentGrade = newGrade;
    refreshInputsValue(newGrade);
  };

  const attachEvents = () => {
    const stars = element.querySelectorAll('.star');
    const inputs = element.querySelectorAll(`.${INPUT_CLASS}`);

    each(stars, (star) => {
      eventHandlerOff(star, 'click', handleMouseClickEvent);
      eventHandlerOn(star, 'click', handleMouseClickEvent);

      eventHandlerOff(star, 'mouseover', handleMouseHoverEvent);
      eventHandlerOn(star, 'mouseover', handleMouseHoverEvent);

      eventHandlerOff(star, 'mouseout', handleMouseHoverEvent);
      eventHandlerOn(star, 'mouseout', handleMouseHoverEvent);
    });

    each(inputs, (input) => {
      eventHandlerOff(input, 'change', handleInputChange);
      eventHandlerOn(input, 'change', handleInputChange);
    });
  };

  const refresh = () => {
    refreshInputsValue(currentGrade);
    starRating(element, currentGrade, max);
  };

  const init = () => {
    starRating(element, grade, max);
    buildTemplate();
    attachEvents();

    element.classList.add(INPUT_INIT_CLASS);
  };

  if (element.classList.contains(INPUT_INIT_CLASS)) {
    refresh();
  } else {
    init();
  }
};

window.starRating = starRating;
window.starRatingInput = starRatingInput;
