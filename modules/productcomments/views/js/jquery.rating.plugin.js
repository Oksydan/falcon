/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */

jQuery.fn.rating = function(generalOptions) {
  const $ratings = $(this);

  $ratings.each(function initRating() {
    const $ratingComponent = $(this);
    var options = generalOptions ? generalOptions : {};
    if (!options.grade && $ratingComponent.data('grade')) {
      options.grade = $ratingComponent.data('grade');
    }
    if (!options.min && $ratingComponent.data('min')) {
      options.min = $ratingComponent.data('min');
    }
    if (!options.max && $ratingComponent.data('max')) {
      options.max = $ratingComponent.data('max');
    }
    if (!options.input && $ratingComponent.data('input')) {
      options.input = $ratingComponent.data('input');
    }
    var componentOptions = jQuery.extend({
      grade: null,
      input: null,
      min: 1,
      max: 5,
      starWidth: 20
    }, options);

    const minValue = Math.min(componentOptions.min, componentOptions.max);
    const maxValue = Math.max(componentOptions.min, componentOptions.max);
    const ratingValue = Math.min(Math.max(minValue, componentOptions.grade), maxValue);

    $ratingComponent.html('');
    $ratingComponent.append('<div class="star-content star-empty clearfix"></div>');
    $ratingComponent.append('<div class="star-content star-full clearfix"></div>');

    const emptyStars = $('.star-empty', this);
    const fullStars = $('.star-full', this);
    const emptyStar = $('<div class="star"></div>');
    const fullStar = $('<div class="star-on"></div>');

    var ratingInput;
    if (componentOptions.input) {
      ratingInput = $('<input type="number" name="'+componentOptions.input+'" id="'+componentOptions.input+'" />');
      ratingInput.val(ratingValue);
      ratingInput.css('display', 'none');
      ratingInput.change(displayInteractiveGrade);
      $ratingComponent.append(ratingInput);
      initInteractiveGrade();
    } else {
      displayGrade(ratingValue);
    }

    function initInteractiveGrade() {
      emptyStars.html('');
      fullStars.html('');
      var newStar;
      for (var i = minValue; i <= maxValue; ++i) {
        newStar = emptyStar.clone();
        newStar.data('grade', i);
        newStar.hover(function overStar() {
          var overIndex = $('.star', fullStars).index($(this));
          $('.star', fullStars).each(function overStars() {
            $(this).removeClass('star-on');
            var starIndex = $('.star', fullStars).index($(this));
            if (starIndex <= overIndex) {
              $(this).addClass('star-hover');
            } else {
              $(this).removeClass('star-hover');
            }
          });
        });
        newStar.click(function selectGrade() {
          var selectedGrade = $(this).data('grade');
          ratingInput.val(selectedGrade);
        });
        fullStars.append(newStar);
      }

      fullStars.hover(function(){}, displayInteractiveGrade);
      displayInteractiveGrade();
    }

    function displayInteractiveGrade() {
      $('.star', fullStars).each(function displayStar() {
        var starValue = $(this).data('grade');
        $(this).removeClass('star-hover');
        if (starValue <= ratingInput.val()) {
          $(this).addClass('star-on');
        } else {
          $(this).removeClass('star-on');
        }
      });
    }

    function displayGrade(grade) {
      emptyStars.html('');
      fullStars.html('');
      var newStar;
      for (var i = minValue; i <= maxValue; ++i) {
        if (i <= Math.floor(grade)) {
          newStar = emptyStar.clone();
          newStar.css('visibility', 'hidden');
          emptyStars.append(newStar);
          fullStars.append(fullStar.clone());
        } else if (i > Math.ceil(grade)) {
          newStar = emptyStar.clone();
          emptyStars.append(newStar.clone());
        } else {
          //This the partial star composed of
          // - one invisible partial empty star
          // - one visible partial empty star (remaining part)
          // - one visible partial full star
          var fullWidth = (grade - i + 1) * componentOptions.starWidth;
          var emptyWidth = componentOptions.starWidth - fullWidth;
          newStar = emptyStar.clone();
          newStar.css('visibility', 'hidden');
          newStar.css('width', fullWidth);
          emptyStars.append(newStar);

          newStar = emptyStar.clone();
          newStar.css('width', emptyWidth);
          newStar.css('background-position', '0px -'+fullWidth+'px');
          newStar.css('background-position', '-'+fullWidth+'px 0px');
          newStar.css('marginLeft', 0);
          emptyStars.append(newStar);

          fullStar.css('width', fullWidth);
          fullStars.append(fullStar.clone());
        }
      }
    }
  });
}
