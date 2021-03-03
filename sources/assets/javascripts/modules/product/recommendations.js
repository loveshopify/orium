import $ from 'jquery';
import { mountSlider } from '../slider'

export const mountRecommendationSection = ($recommendationSection) => {

    const selectors = {        
        placeholder: '[data-product-recommendations-placeholder]',
        recommendationsContent: ' [data-product-recommendations-content]',
    };
    const $placeholder = $recommendationSection.find(selectors.placeholder);
    const productId = $recommendationSection.data('product-id');
    const limit = $recommendationSection.data('limit');
    

    $.ajax({
        type: 'GET',
        url: '/recommendations/products?section_id=ea-product-recommendations&limit='+ limit +'&product_id=' + productId,
        success: function (data) {
            if($(data).find(selectors.recommendationsContent) === undefined) {
                // If no results, hide the entire section
                $recommendationSection.remove();                
            } else {
                $placeholder.html($(data).find(selectors.recommendationsContent).html());
                const $recommendationSliders = $recommendationSection.find('[data-hor-slider]');
                $recommendationSliders.each(function (index, recommendationSlider) {
                    const $recommendationSlider = $(recommendationSlider);
                    mountSlider($recommendationSlider);
                });
                
            }                        
        },
        error: function () {
            console.error("Recommendations content load failed");
        }
    });
    
}

export default function() {
    const $recommendationSections = $('[data-product-recommendations]');
    $recommendationSections.each(function (index, recommendationSection) {
        const $recommendationSection = $(recommendationSection);
        mountRecommendationSection($recommendationSection);
    });
}