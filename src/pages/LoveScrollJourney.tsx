'use client';
import { ReactLenis } from 'lenis/react';
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

export default function LoveScrollJourney() {
  return (
    <ReactLenis root>
      <main className='bg-black'>
        <div className='wrapper'>
          <section className='text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-7xl text-6xl px-8 font-semibold text-center tracking-tight leading-[120%] z-10'>
              Happy Birthday, Unnati! 💕<br /> 
              Scroll Down for Your Special Surprise 👇
            </h1>
          </section>

          <section className='bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 text-black grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            <h1 className='2xl:text-7xl text-4xl px-8 font-semibold text-center tracking-tight leading-[120%] z-10'>
              Every moment with you feels like <br /> 
              a beautiful dream come true 💭✨
            </h1>
          </section>

          <section className='text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[length:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            <div className='z-10 flex items-center justify-center'>
              <TextRevealCard
                text="You light up my world"
                revealText="You are my everything ❤️"
              >
                <TextRevealCardTitle>
                  Hover to reveal my feelings...
                </TextRevealCardTitle>
                <TextRevealCardDescription>
                  Move your cursor across the card to see how much you mean to me.
                </TextRevealCardDescription>
              </TextRevealCard>
            </div>
          </section>
        </div>

        <section className='text-white w-full bg-slate-950'>
          <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className='sticky top-0 h-screen flex items-center justify-center'>
              <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
                Every Memory <br /> 
                With You is <br />
                Pure Magic ✨
              </h1>
            </div>
            <div className='grid gap-2'>
              <figure className='grid place-content-center -skew-x-12'>
                <img
                  src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop'
                  alt='Love moment 1'
                  className='transition-all duration-300 w-80 h-96 align-bottom object-cover'
                />
              </figure>
              <figure className='grid place-content-center skew-x-12'>
                <img
                  src='https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop'
                  alt='Love moment 2'
                  className='transition-all duration-300 w-80 h-96 align-bottom object-cover'
                />
              </figure>
              <figure className='grid place-content-center -skew-x-12'>
                <img
                  src='https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format&fit=crop'
                  alt='Love moment 3'
                  className='transition-all duration-300 w-80 h-96 align-bottom object-cover'
                />
              </figure>
              <figure className='grid place-content-center skew-x-12'>
                <img
                  src='https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&auto=format&fit=crop'
                  alt='Love moment 4'
                  className='transition-all duration-300 w-80 h-96 align-bottom object-cover'
                />
              </figure>
            </div>
          </div>
        </section>

        <section className='text-white w-full bg-slate-950'>
          <div className='grid grid-cols-1 md:grid-cols-2 px-8'>
            <div className='grid gap-2'>
              <figure className='sticky top-0 h-screen grid place-content-center'>
                <img
                  src='https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&auto=format&fit=crop'
                  alt='Special memory 1'
                  className='transition-all duration-300 w-96 h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='sticky top-0 h-screen grid place-content-center'>
                <img
                  src='https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=500&auto=format&fit=crop'
                  alt='Special memory 2'
                  className='transition-all duration-300 w-96 h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='sticky top-0 h-screen grid place-content-center'>
                <img
                  src='https://images.unsplash.com/photo-1535478044878-3ed83d5456ef?w=500&auto=format&fit=crop'
                  alt='Special memory 3'
                  className='transition-all duration-300 w-96 h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='sticky top-0 h-screen grid place-content-center'>
                <img
                  src='https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=500&auto=format&fit=crop'
                  alt='Special memory 4'
                  className='transition-all duration-300 w-96 h-96 align-bottom object-cover rounded-md'
                />
              </figure>
            </div>
            <div className='sticky top-0 h-screen grid place-content-center'>
              <h1 className='text-4xl px-8 font-medium text-right tracking-tight leading-[120%]'>
                You make every day brighter, <br />
                every moment sweeter, <br />
                and life infinitely more beautiful 💖
              </h1>
            </div>
          </div>
        </section>

        <footer className='group bg-slate-950'>
          <h1 className='text-[16vw] group-hover:translate-y-4 translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all ease-linear'>
            I Love You
          </h1>
          <section className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'>
            Forever Yours, Happy Birthday Unnati! 🎂💕
          </section>
        </footer>
      </main>
    </ReactLenis>
  );
}
