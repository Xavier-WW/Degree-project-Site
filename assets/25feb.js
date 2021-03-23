// Hover Preview 22 Mar
$(".tiptext").mouseover(function() {
    $(this).children(".prev").show();

}).mouseout(function() {
    $(this).children(".prev").hide(); 
});

// Smooth scrolling for browsers that don't support CSS smooth scrolling -- 21 Mar
if (window.getComputedStyle(document.documentElement).scrollBehavior !== 'smooth') {
    document.querySelectorAll('a[href^="#"]').forEach(internalLink => {
        const targetElement = document.querySelector(internalLink.getAttribute('href'));
        if (targetElement) {
            internalLink.addEventListener('click', (e) => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                });
                e.preventDefault();
            });
        }
    });
}
/*-- 23 Mar -- not working
$(function() {
    $(window).scroll(function() {
      $(":header").each(function() {
        if ($(window).scrollTop() >= $(this).offset().top) {
          var id = $(this).attr('id');
          $('#toc a').removeClass('active');
          $('#toc a[href="#' + id + '"]').addClass('active');
        }
      });
    });
  });

 //ScrollSpy with IntersectionObserver to highlight left toc -- 22 Mar -- not working
window.addEventListener('DOMContentLoaded', () => {

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.intersectionRatio > 0) {
				document.querySelector(`toc[href="#${id}"]`).parentElement.classList.add('active');
			} else {
				document.querySelector(`toc[href="#${id}"]`).parentElement.classList.remove('active');
			}
		});
	});

	// Track all sections that have an `id` applied
	document.querySelectorAll('div[id]').forEach((section) => {
		observer.observe(section);
	});
	
}); */

