'use client';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
	return (
		<div className='px-[5vw] pt-5 lg:pt-5 pb-10 min-h-[70vh] bg-(--gold) text-black relative before:content-[""] before:absolute before:-top-20 before:left-0 before:w-full before:h-32 before:bg-(--gold) before:z-0'>
			<footer className='w-full h-full py-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div className='flex flex-col justify-start gap-4 h-full'>
					<div className='location text-xs flex gap-2 col-span-2 font-mono opacity-85 text-[#916d24]'>
						{' '}
						<span>Dubrovnik</span>
						{/* current time */}
						<span>
							{new Date().toLocaleTimeString('hr-HR', {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
					</div>
					<div className='social-links flex flex-col md:col-start-1'>
						<span className='text-xs'>Pratite nas</span>
						<a
							className='underline'
							href='https://www.instagram.com/grandfit.andbeauty/'
							target='_blank'
							rel='noopener noreferrer'>
							Instagram
						</a>
						<a
							className='underline'
							href='https://www.facebook.com/grandfit.andbeauty'
							target='_blank'
							rel='noopener noreferrer'>
							Facebook
						</a>
					</div>

					<div className='flex gap-4 md:col-start-1'>
						<div className='text-sm'>
							<p>Kontakt</p>
							<span className='flex max-w-[15ch]'>
								Radnička 46, Dubrovnik, Croatia 20 000
							</span>
						</div>
					</div>

					<div className='md:col-start-1 md:col-span-1 mt-auto'>
						<span
							style={{ fontFamily: 'Anton, serif' }}
							className='text-5xl md:text-[5vw] max-w-[20ch] leading-[1.2] tracking-tight'>
							GrandFit
							<span className='heading-span tracking-tighter'>&Beauty</span>
						</span>
					</div>
					<span className='text-sm flex flex-col md:col-start-1'>
						<span>&copy; {new Date().getFullYear()} GrandFit&Beauty.</span>
						<span>Sva prava pridržana.</span>
					</span>
				</div>
				<div className='h-full'>
					<div className='form-wrapper md:col-start-2 md:col-span-1'>
						<form
							className='grid grid-cols-1 md:grid-cols-2 gap-3'
							onSubmit={(e) => {
								e.preventDefault();
								const form = e.currentTarget as HTMLFormElement;
								const data = Object.fromEntries(new FormData(form).entries());
								console.log('Inquiry submitted:', data);
								alert('Hvala! Vaš upit je poslan.');
								form.reset();
							}}>
							<div className='md:col-span-2'>
								<h4 className='text-lg font-semibold tracking-tight'>
									Registracija / Upit
								</h4>
								<p className='text-xs opacity-70'>
									Izaberite interes i ostavite poruku — javit ćemo vam se
									uskoro.
								</p>
							</div>

							<label className='flex flex-col text-sm'>
								Ime i prezime
								<input
									name='name'
									required
									placeholder='Vaše ime'
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'
								/>
							</label>

							<label className='flex flex-col text-sm'>
								Email
								<input
									name='email'
									type='email'
									required
									placeholder='you@example.com'
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'
								/>
							</label>

							<label className='flex flex-col text-sm md:col-span-2'>
								Telefon (opcionalno)
								<input
									name='phone'
									placeholder='+385...'
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'
								/>
							</label>

							<label className='flex flex-col text-sm'>
								Interes
								<select
									name='interest'
									defaultValue=''
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'>
									<option value='' disabled>
										Odaberite
									</option>
									<option value='beauty'>Beauty tretmani</option>
									<option value='personal-training'>Personalni trening</option>
									<option value='classes'>Grupe / klase</option>
									<option value='nutrition'>Prehrana / savjetovanje</option>
								</select>
							</label>

							<label className='flex flex-col text-sm'>
								Beauty tretman
								<select
									name='beautyTreatment'
									defaultValue=''
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'>
									<option value='' disabled>
										Odaberite
									</option>
									<option value='facial'>NJEGA LICA</option>
									<option value='massage'>MASAŽA</option>
									<option value='manicure'>MANIKURA</option>
									<option value='pedicure'>PEDIKURA</option>
									<option value='hair'>KOSA / FRIZER</option>
								</select>
							</label>

							<label className='flex flex-col text-sm'>
								Personalni trening
								<select
									name='personalTraining'
									defaultValue=''
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'>
									<option value='' disabled>
										Odaberite
									</option>
									<option value='strength'>Snaga</option>
									<option value='weight-loss'>Mršavljenje</option>
									<option value='mobility'>Mobilnost</option>
									<option value='endurance'>Izdržljivost</option>
								</select>
							</label>

							<label className='flex flex-col text-sm'>
								Grupi treninzi
								<select
									name='classes'
									defaultValue=''
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'>
									<option value='' disabled>
										Odaberite
									</option>
									<option value='yoga'>Yoga</option>
									<option value='pilates'>Pilates</option>
									<option value='hiit'>HIIT</option>
									<option value='dance'>Dance</option>
								</select>
							</label>

							<label className='flex flex-col text-sm md:col-span-2'>
								Poruka
								<textarea
									name='message'
									rows={4}
									placeholder='Recite nam više...'
									className='mt-1 border-b border-black/30 py-2 bg-transparent focus:outline-none focus:border-black/60'
								/>
							</label>

							<div className='md:col-span-2 flex flex-col lg:flex-row items-start gap-2 lg:items-center justify-between'>
								<label className='flex items-center gap-2 text-xs opacity-80'>
									<input
										type='checkbox'
										name='consent'
										required
										className='rounded border-black/20 bg-amber-200'
									/>
									<span>Prihvaćam obradu podataka u svrhu kontakta.</span>
								</label>
								<button
									type='submit'
									className='bg-(--black) text-(--gold) px-4 py-2 rounded-md text-sm hover:opacity-90 transition mt-2 lg:mt-0'>
									Pošalji upit
								</button>
							</div>
						</form>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
