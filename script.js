// 1. Header Sticky Logic
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 40) {
        header?.classList.add('bg-surface/95', 'backdrop-blur-md', 'shadow-md', 'py-2');
        header?.classList.remove('bg-surface');
    } else {
        header?.classList.remove('bg-surface/95', 'backdrop-blur-md', 'shadow-md', 'py-2');
        header?.classList.add('bg-surface');
    }
});

// 2. Scroll Spy (Active Menu Highlight)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;
    
    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    if (scrollY < 100) current = "hero";
    
    navLinks.forEach((link) => {
        link.classList.remove("border-primary", "text-primary", "font-semibold");
        link.classList.add("border-transparent", "text-[#1A1A1A]", "font-medium");
        if (link.getAttribute("data-section") === current) {
            link.classList.remove("border-transparent", "text-[#1A1A1A]", "font-medium");
            link.classList.add("border-primary", "text-primary", "font-semibold");
        }
    });
});

// 3. Services Modal Logic
function openServiceModal(category) {
    const modal = document.getElementById('services-modal');
    const modalContent = document.getElementById('modal-content');
    const details = document.querySelectorAll('.service-detail');
    
    details.forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`modal-${category}`);
    if(target) target.classList.remove('hidden');
    
    modal?.classList.remove('hidden');
    setTimeout(() => {
        modal?.classList.remove('opacity-0');
        modalContent?.classList.remove('scale-95');
    }, 10);
}

function closeServiceModal() {
    const modal = document.getElementById('services-modal');
    const modalContent = document.getElementById('modal-content');
    
    modal?.classList.add('opacity-0');
    modalContent?.classList.add('scale-95');
    
    setTimeout(() => { modal?.classList.add('hidden'); }, 300);
}

document.getElementById('services-modal')?.addEventListener('click', function(e) {
    if(e.target === this) closeServiceModal();
});

// 4. Live EMI Calculator Engine
function calculateLiveEMI() {
    const pEl = document.getElementById('emi-principal');
    const rEl = document.getElementById('emi-rate');
    const tEl = document.getElementById('emi-tenure');
    
    if (!pEl || !rEl || !tEl) return;
    
    const P = parseFloat(pEl.value);
    const annualRate = parseFloat(rEl.value);
    const years = parseFloat(tEl.value);
    
    const outP = document.getElementById('val-principal');
    const outR = document.getElementById('val-rate');
    const outT = document.getElementById('val-tenure');

    if(outP) outP.innerText = '₹' + Number(P).toLocaleString('en-IN');
    if(outR) outR.innerText = annualRate + '%';
    if(outT) outT.innerText = years + (years === 1 ? ' Year' : ' Years');
    
    const r = (annualRate / 12) / 100;
    const n = years * 12;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = emi * n;
    const totalInterest = totalPaid - P;
    
    const emiTxt = document.getElementById('out-emi');
    const intTxt = document.getElementById('out-interest');

    if(emiTxt) emiTxt.innerText = '₹' + Math.round(emi).toLocaleString('en-IN');
    if(intTxt) intTxt.innerText = '₹' + Math.round(totalInterest).toLocaleString('en-IN');
}

// Updated Custom Cover Toggle
function toggleCustomCover(val) {
    const customWrapper = document.getElementById('quote-custom-cover-wrapper');
    const customInput = document.getElementById('quote-custom-cover');
    if (val && val.includes('CUSTOM')) {
        customWrapper?.classList.remove('hidden');
        customInput?.focus();
    } else {
        customWrapper?.classList.add('hidden');
    }
}

// 5. Quote Desk WhatsApp Trigger (Ultimate Bulletproof Version)
function sendWhatsAppQuote() {
    const domain = document.getElementById('quote-domain')?.value;
    let cover = document.getElementById('quote-cover')?.value;
    
    if (cover && cover.includes('CUSTOM')) {
        const customInput = document.getElementById('quote-custom-cover');
        const typedVal = customInput?.value.trim();
        
        if (!typedVal) {
            alert("Please enter your required custom cover amount!");
            customInput?.focus();
            return; 
        }
        cover = typedVal.startsWith('₹') ? typedVal : `₹${typedVal}`;
    }
    
    const age = document.getElementById('quote-age')?.value;
    
    if(!domain || !cover || !age) {
        alert("Please fill all the fields!");
        return;
    }
    
    const message = `Hi Sowbhagya Shree Team,\n\nI would like to get an accurate institutional quote for my insurance portfolio.\n\n📋 *Applicant Profile:*\n• Category: ${domain}\n• Required Cover: ${cover}\n• Applicant Age: ${age} Years\n\nPlease review your institutional tables and share the best matching plans.`;
    
    // Direct Page Redirect (Never gets blocked by any browser)
    window.location.href = "https://wa.me/919176024156?text=" + encodeURIComponent(message);
}
// 7. On Load Triggers
document.addEventListener("DOMContentLoaded", () => {
    ['emi-principal', 'emi-rate', 'emi-tenure'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculateLiveEMI);
    });
    calculateLiveEMI();

    const contactSection = document.getElementById('contact');
    const floatingButtons = document.querySelectorAll('.floating-actions'); 
    
    if (contactSection && floatingButtons.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                floatingButtons.forEach(btn => {
                    btn.style.opacity = entry.isIntersecting ? '0' : '1';
                    btn.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
                });
            });
        }, { threshold: 0.15 });
        observer.observe(contactSection);
    }
});