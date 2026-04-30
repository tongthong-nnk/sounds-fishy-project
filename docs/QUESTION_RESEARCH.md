# Question Research

Last updated milestone: Milestone 17

## Purpose

This document is the source-of-truth ledger for the 150-question bizarre fun-fact deck in `lib/questions.ts`.

Milestone 17 localizes the playable deck into natural Thai for Thai Discord play, while preserving the approved English source and confidence trail below.

Milestone 16 replaces the earlier generic trivia deck with weird-but-true prompts designed for bluffing:

- Short question and answer.
- Strange enough to spark discussion.
- Plausible enough that fake answers are easy to invent.
- High or medium confidence only.
- No low-confidence viral myths in the final deck.

## Summary

- Final deck size: 150 Thai-localized questions.
- Final IDs: `q1` through `q150`.
- Final confidence levels: high or medium only.
- Low-confidence facts are excluded.
- Thai question text is localized for natural read-aloud play, not translated literally.
- English source and confidence information is preserved.

## Category Distribution

| Category | Count |
| --- | ---: |
| Weird history and ancient customs | 20 |
| Weird animals | 30 |
| Food oddities and everyday-object origins | 25 |
| Strange festivals and traditions | 20 |
| Odd records and feats | 15 |
| Strange science, body, space, and geography | 30 |
| Language, pop culture, sports, and games | 10 |

## Confidence Distribution

| Confidence | Count |
| --- | ---: |
| High | 128 |
| Medium | 22 |
| Low | 0 |

## Research Ledger

The table below preserves the approved English fact trail, source notes, and confidence levels from Milestone 16.

| id | category | question | answer | why it works for bluffing | source title or URL | confidence |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Weird history and ancient customs | What did ancient Greek and Roman doctors reportedly use as a wound dressing? | Spider webs | Gross, visual, and believable as either folk medicine or nonsense. | NLM and Smithsonian articles on spider silk and wound dressings | high |
| q2 | Weird history and ancient customs | What did some ancient Greeks and Romans use before toilet paper? | Pessoi | The answer is odd, short, and easy to bluff around. | National Geographic: What did people use before toilet paper? | high |
| q3 | Weird history and ancient customs | What liquid did ancient Roman fullers use to clean clothes? | Urine | Sounds fake, but the ammonia detail makes it real. | Smithsonian: ancient Roman laundry and urine tax references | high |
| q4 | Weird history and ancient customs | In Strasbourg's 1518 plague, what could people not stop doing? | Dancing | The answer is absurdly simple and invites wild alternatives. | History.com and Britannica: Dancing Plague of 1518 | high |
| q5 | Weird history and ancient customs | What sticky liquid flooded part of Boston in 1919? | Molasses | Famous but still bizarre for players who do not know it. | Britannica: Boston Molasses Flood | high |
| q6 | Weird history and ancient customs | What drink flooded a London neighborhood in 1814? | Beer | The everyday answer makes the disaster sound invented. | Historic UK: London Beer Flood | high |
| q7 | Weird history and ancient customs | What animal did Australia's military famously fail to defeat in 1932? | Emus | The premise is comically unbelievable. | National Museum of Australia: Great Emu War | high |
| q8 | Weird history and ancient customs | The 1835 Great Moon Hoax claimed the Moon had what winged creatures? | Bat-men | A strong fake-news history prompt with a strange answer. | Smithsonian: The Great Moon Hoax | high |
| q9 | Weird history and ancient customs | Mary Toft's 1726 medical hoax involved pretending to give birth to what? | Rabbits | It sounds impossible but historically documented. | Wellcome Collection: Mary Toft | high |
| q10 | Weird history and ancient customs | Astronomer Tycho Brahe famously wore a prosthetic made partly of what? | Metal | A weird biographical fact with lots of plausible fake metals. | Britannica: Tycho Brahe | high |
| q11 | Weird history and ancient customs | Ancient writers said King Mithridates VI built tolerance by taking small doses of what? | Poison | The safer wording flags that the story comes from ancient accounts while keeping the bizarre premise. | Britannica: Mithridates VI Eupator | medium |
| q12 | Weird history and ancient customs | Britain once taxed houses based on the number of what? | Windows | Strange law with an everyday-object answer. | Historic England: Window Tax | high |
| q13 | Weird history and ancient customs | During Dutch tulip mania, people speculated wildly on what? | Tulip bulbs | Familiar item, absurd financial context. | Britannica: Tulip Mania | high |
| q14 | Weird history and ancient customs | A Swedish king's legendary last meal included huge servings of what cream-filled buns? | Semla buns | The wording avoids claiming the buns alone caused death while preserving the weird food story. | Sweden.se: The semla, and historical summaries of Adolf Frederick | medium |
| q15 | Weird history and ancient customs | A 1904 Olympic marathon winner was dosed with what now-banned stimulant? | Strychnine | Sports history answer feels like a bad fake. | Smithsonian: 1904 Olympic marathon | high |
| q16 | Weird history and ancient customs | The BBC's 1957 April Fools hoax claimed what food grew on trees? | Spaghetti | Perfect "wait, people believed that?" bluffing energy. | BBC: Spaghetti tree hoax | high |
| q17 | Weird history and ancient customs | The 1859 Carrington Event made some operators get shocks from what? | Telegraph wires | Scientific disaster with an unusually dramatic effect. | NASA: Carrington Event | high |
| q18 | Weird history and ancient customs | Medieval European records include legal trials of what nonhuman defendants? | Animals | The safer wording avoids implying this was universal while keeping the surreal legal image. | Smithsonian: animal trials in medieval Europe | medium |
| q19 | Weird history and ancient customs | The 1859 Pig War began after an American settler shot what animal? | A pig | It replaces a thin Napoleon anecdote with a better verified weird-history prompt and a dead-simple answer. | National Park Service: Kaiser Wil-Ham Statue and Pig War history | high |
| q20 | Weird history and ancient customs | Pompeii's excavated fast-food counters are known by what name? | Thermopolia | Oddly modern premise, strange concise answer. | Pompeii Archaeological Park: thermopolium finds | high |
| q21 | Weird animals | What animal is famous for producing cube-shaped poop? | Wombats | Iconic weird animal fact with many plausible guesses. | National Geographic and Smithsonian: wombat cube poop | high |
| q22 | Weird animals | What egg-laying mammal glows blue-green under ultraviolet light? | Platypus | The animal is already strange; the glow adds surprise. | Smithsonian: platypus biofluorescence | high |
| q23 | Weird animals | What salamander can regrow lost limbs, jaws, and parts of its heart? | Axolotl | Strange biology with a cute, memorable answer. | National Geographic and NIH: axolotl regeneration | high |
| q24 | Weird animals | What sea creature uses club-like limbs to deliver explosive punches? | Mantis shrimp | Action-movie animal fact, easy to fake. | Smithsonian Ocean: mantis shrimp | high |
| q25 | Weird animals | What eel-like animal can flood a predator's mouth with slime? | Hagfish | Gross, funny, and short. | Smithsonian Ocean: hagfish slime | high |
| q26 | Weird animals | What sea animal can eject some internal organs as a defense? | Sea cucumber | Sounds impossible but is real. | National Geographic: sea cucumber defense | high |
| q27 | Weird animals | What microscopic animal can survive the vacuum of space? | Tardigrade | Famous but still ideal for party bluffing. | NASA and ESA references to tardigrades in space | high |
| q28 | Weird animals | What animal has blue blood, three hearts, and a talent for escaping jars? | Octopus | Short answer, surprising anatomy. | Smithsonian Ocean: octopus anatomy | high |
| q29 | Weird animals | What bird can remember human faces for years? | Crow | Funny social-behavior prompt. | University of Washington crow cognition research | high |
| q30 | Weird animals | What bird can mimic chainsaws and camera shutters? | Lyrebird | Audio mimicry makes a vivid bluffing clue. | BBC Earth: lyrebird mimicry | high |
| q31 | Weird animals | What shark may live for several centuries? | Greenland shark | The lifespan is hard to believe. | National Geographic: Greenland shark longevity | high |
| q32 | Weird animals | What jellyfish can reset itself to a younger life stage when stressed? | Immortal jellyfish | The wording avoids implying true invincibility while keeping the unbelievable biology. | American Museum of Natural History: immortal jellyfish | high |
| q33 | Weird animals | What beetle sprays a hot chemical blast from its rear? | Bombardier beetle | Comic, disgusting, and memorable. | Britannica and Smithsonian: bombardier beetle | high |
| q34 | Weird animals | What fish shoots water jets to knock insects into the water? | Archerfish | Easy to visualize and bluff. | Britannica: archerfish | high |
| q35 | Weird animals | What shrimp stuns prey with a bubble made by a snapping claw? | Pistol shrimp | The physics feels unreal. | NOAA and Smithsonian Ocean: snapping shrimp cavitation | high |
| q36 | Weird animals | What flying mammal shares regurgitated meals with hungry friends? | Vampire bat | Sounds spooky but is social behavior. | National Geographic: vampire bat food sharing | medium |
| q37 | Weird animals | What frog can survive winter by partly freezing? | Wood frog | Perfect "no way" animal clue. | National Geographic: wood frog freezing | high |
| q38 | Weird animals | What marine mammal has loose underarm skin used like pockets? | Sea otter | Cute and believable with several fake options. | Monterey Bay Aquarium: sea otter tools | high |
| q39 | Weird animals | In what animal group do males carry the pregnancy? | Seahorses | Short, surprising reproductive twist. | Smithsonian Ocean: seahorse reproduction | high |
| q40 | Weird animals | What ancient arthropod has blue blood used in medical safety tests? | Horseshoe crab | Real science with a strange object answer. | NOAA and Smithsonian: horseshoe crab blood | high |
| q41 | Weird animals | What reef fish sleeps inside a mucus cocoon? | Parrotfish | The beach-sand link is bizarre and friendly. | NOAA: parrotfish and reef sand | high |
| q42 | Weird animals | What marsupial has fingerprints that can resemble human ones? | Koala | A funny forensic-sounding animal fact. | National Geographic: koala fingerprints | high |
| q43 | Weird animals | What do sloths climb down from trees to do about once a week? | Poop | Odd behavior with comic timing. | Smithsonian: sloth bathroom behavior | high |
| q44 | Weird animals | What insect has been trained in studies to recognize human faces? | Bees | Tiny animal, oddly sophisticated answer. | Scientific American: honeybee face recognition | high |
| q45 | Weird animals | Elephants can communicate over long distances using what low sound? | Infrasound | Striking and bluffable. | National Geographic: elephant infrasound | high |
| q46 | Weird animals | A narwhal's famous tusk is actually what body part? | A tooth | Short answer, great reveal. | Smithsonian Ocean: narwhal tusks | high |
| q47 | Weird animals | What star-nosed mammal can sniff underwater by blowing bubbles? | Star-nosed mole | Ridiculous mental image, real behavior. | Vanderbilt research on star-nosed moles | high |
| q48 | Weird animals | Male pufferfish make underwater crop-circle patterns out of what? | Sand | Strong visual and surprising builder. | BBC Earth and National Geographic: pufferfish circles | high |
| q49 | Weird animals | What nickname is given to the fungus that can make ants climb before it sprouts? | Zombie-ant fungus | This avoids the Cordyceps/Ophiocordyceps naming trap and keeps the table-talk hook. | Library of Congress and Scientific American: zombie-ant fungus | high |
| q50 | Weird animals | What glowing insect makes light with very little heat? | Firefly | Simple answer, good fake alternatives. | Scientific American: firefly bioluminescence | high |
| q51 | Food oddities and everyday-object origins | What children's toy began as a cleaner for coal-sooted wallpaper? | Play-Doh | Beloved object with an absurd origin. | Smithsonian: Play-Doh history | high |
| q52 | Food oddities and everyday-object origins | What packaging material was first imagined as textured wallpaper? | Bubble Wrap | Everyone knows the object, few know the origin. | Smithsonian: Bubble Wrap history | high |
| q53 | Food oddities and everyday-object origins | What frozen treat began when a child left soda outside with a stick in it? | Popsicle | Charming accident story with a concise answer. | Smithsonian: Popsicle history | high |
| q54 | Food oddities and everyday-object origins | What toy came from a naval engineer watching a spring walk off a shelf? | Slinky | Origin story is a little legendary but well sourced. | National Inventors Hall of Fame: Slinky | medium |
| q55 | Food oddities and everyday-object origins | What stretchy toy came from a wartime attempt to make synthetic rubber? | Silly Putty | Failed invention becomes toy. | Smithsonian and ACS: Silly Putty history | medium |
| q56 | Food oddities and everyday-object origins | What office product exists because a glue was accidentally too weak? | Post-it Notes | Familiar object, surprising failure. | 3M: Post-it Notes history | high |
| q57 | Food oddities and everyday-object origins | What fastener was inspired by burrs sticking to a dog's fur? | Velcro | Clear visual and many possible fake answers. | National Inventors Hall of Fame: Velcro | high |
| q58 | Food oddities and everyday-object origins | What kitchen appliance idea began after a candy bar melted near radar gear? | Microwave oven | The candy-bar origin is fun to bluff. | Raytheon and Smithsonian references to microwave oven history | high |
| q59 | Food oddities and everyday-object origins | What adhesive was first discovered while searching for clear gun-sight plastic? | Super Glue | Weird accident with a practical answer. | National Inventors Hall of Fame: Super Glue | high |
| q60 | Food oddities and everyday-object origins | The first synthetic purple dye came from a failed attempt to make what medicine? | Quinine | Technical but the medicine/dye mismatch works. | Science History Institute: William Perkin and mauveine | medium |
| q61 | Food oddities and everyday-object origins | What toy got its name after Theodore Roosevelt refused to shoot a bear? | Teddy bear | Familiar answer, odd origin. | Smithsonian: teddy bear history | high |
| q62 | Food oddities and everyday-object origins | What flying toy is linked to students tossing pie-company tins? | Frisbee | Everyday object with playful origin. | Smithsonian: Frisbee history | high |
| q63 | Food oddities and everyday-object origins | What cold-weather accessory was patented by a teenager from Maine? | Earmuffs | Plain answer, odd kid-inventor setup. | National Inventors Hall of Fame: Chester Greenwood | high |
| q64 | Food oddities and everyday-object origins | What baking glassware was inspired by heat-resistant railroad lantern glass? | Pyrex | Kitchen object with strange lab origin. | Corning Museum of Glass: Pyrex history | high |
| q65 | Food oddities and everyday-object origins | Ancient Roman garum sauce was made by fermenting what? | Fish guts | It replaces a murky ketchup-pill claim with a strongly sourced ancient-food oddity. | National Geographic and Britannica: garum fermented fish sauce | high |
| q66 | Food oddities and everyday-object origins | What breakfast cereal began as intentionally bland health food? | Corn flakes | Familiar food with strange health-culture origin. | Smithsonian: Kellogg and corn flakes history | medium |
| q67 | Food oddities and everyday-object origins | What fruit was once rented in Britain as a dinner-table status symbol? | Pineapple | Funny luxury-object fact with believable fake fruits. | Atlas Obscura: pineapple rental and display culture | high |
| q68 | Food oddities and everyday-object origins | What nut grows attached to the bottom of a swollen fruit? | Cashew | The answer is common but the biology is surprising. | Britannica: cashew | high |
| q69 | Food oddities and everyday-object origins | Vanilla flavor comes from the seed pods of what plant family? | Orchids | Familiar flavor, strange plant origin. | Britannica: vanilla | high |
| q70 | Food oddities and everyday-object origins | The world's priciest spice is harvested from what part of a crocus? | Stigmas | Short, elegant, and bluffable. | Britannica: saffron | high |
| q71 | Food oddities and everyday-object origins | What fish is a hidden ingredient in traditional Worcestershire sauce? | Anchovies | Everyday sauce with fishy twist. | Lea and Perrins ingredient information | high |
| q72 | Food oddities and everyday-object origins | Iceland's hakarl is made from fermented what? | Shark | Strange food, concise answer. | Atlas Obscura: hakarl | high |
| q73 | Food oddities and everyday-object origins | What spread is made from concentrated brewer's yeast extract? | Marmite | Weird origin but brand-specific. | Marmite history and BBC food history summaries | medium |
| q74 | Food oddities and everyday-object origins | Old-fashioned marshmallow candy was named for what plant part? | Marshmallow root | Familiar candy with plant origin. | Smithsonian: marshmallow history | high |
| q75 | Food oddities and everyday-object origins | Sardinia's casu marzu cheese is famous for containing live what? | Maggots | It replaces a mild duplicate-pineapple clue with a stronger weird-food fact. | Atlas Obscura: casu marzu | high |
| q76 | Strange festivals and traditions | At Spain's El Colacho festival, costumed devils jump over what? | Babies | One of the strongest weird-but-true prompts. | Official Burgos tourism and festival summaries | high |
| q77 | Strange festivals and traditions | At La Tomatina, crowds throw what at each other? | Tomatoes | Easy to picture and very party-friendly. | Official La Tomatina tourism site | high |
| q78 | Strange festivals and traditions | At Cooper's Hill, racers chase what down a steep hill? | Cheese | Physical comedy in one sentence. | Cooper's Hill Cheese Rolling official and BBC | high |
| q79 | Strange festivals and traditions | The Wife Carrying World Championship prize is famously paid in what? | Beer | Strange prize, easy fake alternatives. | Wife Carrying World Championship official site | high |
| q80 | Strange festivals and traditions | Oaxaca's Night of the Radishes features sculptures carved from what? | Radishes | Title almost sounds fake but answer is still fun. | Oaxaca tourism: Night of the Radishes | high |
| q81 | Strange festivals and traditions | Thailand's Lopburi Monkey Buffet lays out food for what animals? | Macaques | Friendly, local, and surprising. | Tourism Authority of Thailand: Lopburi Monkey Buffet | high |
| q82 | Strange festivals and traditions | Italy's Battle of the Oranges uses what fruit as ammunition? | Oranges | Food fight with historic pageantry. | Official Ivrea Carnival: Battle of the Oranges | high |
| q83 | Strange festivals and traditions | Finland hosts a world championship for pretending to play what? | Air guitar | Great party-game energy. | Air Guitar World Championships official site | high |
| q84 | Strange festivals and traditions | Japan's Naki Sumo contest tries to make what competitors cry? | Babies | Weird but handled as a tradition, not cruelty. | Japan tourism and BBC travel summaries on Naki Sumo | medium |
| q85 | Strange festivals and traditions | Scotland's Up Helly Aa ends by burning what kind of replica? | Viking ship | Visual and dramatic. | Up Helly Aa official site | high |
| q86 | Strange festivals and traditions | Spain's Haro festival turns into a battle using what drink? | Wine | Food-fight cousin, concise answer. | Haro tourism: Wine Battle | high |
| q87 | Strange festivals and traditions | In worm charming contests, competitors try to lure what from the ground? | Worms | Good bluffing because many silly answers fit. | World Worm Charming Championship and BBC | high |
| q88 | Strange festivals and traditions | The World Toe Wrestling Championship is fought using what body part? | Toes | Obvious once revealed, but funny. | World Toe Wrestling Championship coverage | high |
| q89 | Strange festivals and traditions | Boryeong, South Korea, holds a summer festival built around what? | Mud | Simple, sensory, and social. | Boryeong Mud Festival official site | high |
| q90 | Strange festivals and traditions | Thailand's Songkran celebrations are famous for battles with what? | Water | Familiar in Thailand, still useful internationally. | Tourism Authority of Thailand: Songkran | high |
| q91 | Strange festivals and traditions | Albuquerque's famous annual fiesta fills the sky with what? | Balloons | Pretty visual with easy fakes. | Albuquerque International Balloon Fiesta official site | high |
| q92 | Strange festivals and traditions | The World Bog Snorkelling Championship sends racers through what? | Peat bog | The setting makes it bizarre. | World Bog Snorkeling Championship and Visit Wales | high |
| q93 | Strange festivals and traditions | Highland games athletes toss a long wooden pole called what? | Caber | Strong sports/tradition oddity. | Encyclopaedia Britannica: caber toss | high |
| q94 | Strange festivals and traditions | The Nenana Ice Classic bets on when a tripod will move on what? | River ice | Specific but strange and concise. | Nenana Ice Classic official site | high |
| q95 | Strange festivals and traditions | Hong Kong's Cheung Chau festival includes climbing towers covered with what? | Buns | It replaces a macabre festival clue with a livelier verified tradition. | Hong Kong Tourism Board: Cheung Chau Bun Festival | high |
| q96 | Odd records and feats | Kevin Shelley set a record by breaking 46 what with his head? | Toilet seats | Excellent shock-value record with a short answer. | Guinness World Records: most toilet seats broken by head | high |
| q97 | Odd records and feats | A Guinness record holder balanced 31 what on his face? | Spoons | Silly visual record. | Guinness World Records: most spoons balanced on the face | high |
| q98 | Odd records and feats | Toby the whippet set a record by popping 100 what? | Balloons | Funny animal-record prompt. | Guinness World Records: fastest time to pop 100 balloons by a dog | high |
| q99 | Odd records and feats | Charles Osborne held the record for the longest attack of what? | Hiccups | Human body record with a simple answer. | Guinness World Records: longest attack of hiccups | high |
| q100 | Odd records and feats | The largest bath toy record belongs to a giant floating what? | Rubber duck | Weird public-art visual. | Public Art Fund and artist documentation on Rubber Duck | high |
| q101 | Odd records and feats | A parrot named Smudge set a record by removing what from a ring? | Keys | Odd animal skill with several bluffable tools. | Guinness World Records: parrot opens cans | medium |
| q102 | Odd records and feats | Chad Fell set a record by blowing a giant bubble with what? | Bubblegum | Obvious answer, but the record framing helps. | Guinness World Records: largest bubblegum bubble | high |
| q103 | Odd records and feats | Pete Glazebrook set a record for growing an enormous what? | Onion | Funny because it sounds too ordinary. | Guinness World Records: heaviest onion | high |
| q104 | Odd records and feats | Some Guinness record holders are measured for extraordinarily long what? | Fingernails | Memorable but mildly odd-body; still safe. | Guinness World Records: longest fingernails on one hand | medium |
| q105 | Odd records and feats | Suresh Joachim set a record by riding what for 140 miles? | Escalators | Mundane object, absurd duration. | Guinness World Records: longest escalator ride | high |
| q106 | Odd records and feats | Charlotte Lee's collection record involved thousands of what bath toys? | Rubber ducks | Cute, collectible, and weird. | Guinness World Records: largest rubber duck collection | high |
| q107 | Odd records and feats | Tillman the bulldog set a speed record riding what? | Skateboard | Charming stunt record. | Guinness World Records: dog skateboarding through a tunnel of people | medium |
| q108 | Odd records and feats | Val Kolpakov's collection record involved thousands of tubes of what? | Toothpaste | Odd collecting hobby, easy bluff choices. | Guinness World Records and record profiles: toothpaste tube collection | medium |
| q109 | Odd records and feats | Ranmaru the dog held a record for unusually long what? | Eyelashes | Weirdly specific and cute. | Guinness World Records: longest eyelashes on a dog | medium |
| q110 | Odd records and feats | A record for the largest Zumba class counted nearly 13,000 what? | Dancers | Party-friendly and not too obscure. | Guinness World Records: largest Zumba class | high |
| q111 | Strange science, body, space, and geography | On the space station, NASA recycles urine and sweat into what? | Drinking water | Gross but NASA-confirmed and funny. | NASA: ISS water recovery system | high |
| q112 | Strange science, body, space, and geography | Apollo astronauts had to use adhesive plastic bags as what? | Toilets | Mildly gross but historically true and short. | NASA: Apollo waste management history | high |
| q113 | Strange science, body, space, and geography | Astronauts wear Maximum Absorbency Garments that are basically what? | Diapers | Funny everyday answer for spaceflight. | NASA: maximum absorbency garments | high |
| q114 | Strange science, body, space, and geography | Apollo astronauts said Moon dust smelled like what? | Gunpowder | Vivid sensory answer. | NASA: Moon dust smell reports | high |
| q115 | Strange science, body, space, and geography | Astronauts can become temporarily what after living in microgravity? | Taller | Surprising body fact with easy fake body parts. | NASA: human body in microgravity | high |
| q116 | Strange science, body, space, and geography | What planet has a day longer than its year? | Venus | Classic but still weird enough. | NASA Solar System Exploration: Venus | high |
| q117 | Strange science, body, space, and geography | What planet spins almost sideways? | Uranus | Simple weird-space fact. | NASA Solar System Exploration: Uranus | high |
| q118 | Strange science, body, space, and geography | Saturn's moon Titan has lakes filled mainly with what? | Methane | Familiar word, alien context. | NASA: Titan methane lakes | high |
| q119 | Strange science, body, space, and geography | Sunsets on Mars often appear what color near the Sun? | Blue | Great short reversal of Earth expectation. | NASA: blue sunsets on Mars | high |
| q120 | Strange science, body, space, and geography | Mercury has frozen what hiding in permanently shadowed craters? | Water ice | Counterintuitive because Mercury is hot. | NASA: Mercury water ice | high |
| q121 | Strange science, body, space, and geography | Tiny Demodex creatures that live on many human faces are what? | Mites | Mildly creepy but party-safe. | NC State and Live Science: Demodex mites | high |
| q122 | Strange science, body, space, and geography | A large share of ordinary house dust comes from flakes of what? | Skin | Gross, familiar, bluffable. | American Chemical Society and science explainers on household dust | high |
| q123 | Strange science, body, space, and geography | Your stomach protects itself from its own acid with what coating? | Mucus | Body fact with a weirdly plain answer. | NIH and medical physiology summaries on stomach mucus barrier | medium |
| q124 | Strange science, body, space, and geography | A single gene helps decide whether your earwax is wet or what? | Dry | Odd everyday genetics. | Nature Genetics and NIH summaries on ABCC11 | medium |
| q125 | Strange science, body, space, and geography | The three tiniest bones in your body are found in what body part? | Ear | Concise anatomy prompt. | Britannica: ossicles | high |
| q126 | Strange science, body, space, and geography | Human babies start life with more what than adults? | Bones | Familiar fact, still bluff-friendly. | Cleveland Clinic and anatomy references | high |
| q127 | Strange science, body, space, and geography | Humans emit visible light that is too faint to see without what? | Cameras | Sounds supernatural but is weak biophoton emission. | PLOS ONE and Live Science: human body glow | medium |
| q128 | Strange science, body, space, and geography | In orbit, flames often burn in what shape? | Spheres | Fire behaving oddly is vivid. | NASA: combustion in microgravity | high |
| q129 | Strange science, body, space, and geography | Liquid water floating in microgravity naturally forms what shape? | Sphere | Easy, visual, and useful for bluffing. | NASA astronaut demonstrations of water in microgravity | high |
| q130 | Strange science, body, space, and geography | The ISS orbits Earth roughly every how many minutes? | 90 minutes | A number answer, but short and surprising. | NASA: International Space Station facts | high |
| q131 | Strange science, body, space, and geography | Venus is covered by clouds made mostly of what acid? | Sulfuric acid | It replaces a nuance-heavy space-alcohol claim with a clean NASA-backed planet fact. | NASA Science: Venus cloud tops | high |
| q132 | Strange science, body, space, and geography | What planet rains diamonds in some scientific models? | Neptune | Model-based, so wording says "in some scientific models." | Scientific American and Nature Astronomy coverage of ice-giant diamond rain | medium |
| q133 | Strange science, body, space, and geography | What moon has geysers that spray water into space? | Enceladus | Space geyser is strange and concise. | NASA: Enceladus plumes | high |
| q134 | Strange science, body, space, and geography | What does NOAA use to name the deepest part of the ocean? | Challenger Deep | Geography prompt with a dramatic name. | NOAA: Challenger Deep | high |
| q135 | Strange science, body, space, and geography | Utah's giant Pando organism is mostly made of thousands of what? | Aspen stems | "One organism made of trees" is a strong weird nature fact. | USDA Forest Service: Pando aspen clone | high |
| q136 | Strange science, body, space, and geography | At Point Nemo, the nearest humans are often people aboard what? | Space station | Geography plus space twist. | NOAA Ocean Exploration and NASA ISS facts | high |
| q137 | Strange science, body, space, and geography | Turkmenistan's burning Darvaza crater is nicknamed the Door to what? | Hell | Bizarre place-name with a short answer. | Atlas Obscura: Darvaza gas crater | high |
| q138 | Strange science, body, space, and geography | Measured from its base on the seafloor, what mountain beats Everest? | Mauna Kea | Familiar mountain category with surprising answer. | NOAA and Britannica: Mauna Kea | high |
| q139 | Strange science, body, space, and geography | Western Australia's Lake Hillier is famous for being what color? | Pink | Vivid and party-friendly. | Western Australia tourism and science explainers: Lake Hillier | high |
| q140 | Strange science, body, space, and geography | Bolivia's Salar de Uyuni is the world's largest flat made of what? | Salt | Beautiful and simple geography oddity. | Bolivia tourism and National Geographic: Salar de Uyuni | high |
| q141 | Language, pop culture, sports, and games | Iceland is famous for having no native species of what biting insect? | Mosquito | Geography/nature fact with a funny answer. | Icelandic Institute of Natural History summaries | high |
| q142 | Language, pop culture, sports, and games | What is the tiny dot over a lowercase i or j called? | Tittle | Tiny word, funny sound, great reveal. | Merriam-Webster: tittle | high |
| q143 | Language, pop culture, sports, and games | What symbol was once recited by schoolchildren after Z? | Ampersand | Word-history oddity with a familiar symbol. | Merriam-Webster: ampersand | medium |
| q144 | Language, pop culture, sports, and games | The word robot comes from a Czech word linked to what? | Forced labor | Pop culture plus etymology. | Britannica: robot etymology and Karel Capek | medium |
| q145 | Language, pop culture, sports, and games | Bluetooth technology is named after a king associated with what country? | Denmark | Tech name with medieval surprise. | Bluetooth SIG: Harald Bluetooth naming story | high |
| q146 | Language, pop culture, sports, and games | The term spam email is linked to a sketch by what comedy group? | Monty Python | Developer-friendly but still funny. | Python documentation FAQ | high |
| q147 | Language, pop culture, sports, and games | The word maverick originally referred to unbranded what? | Calves | Common word with ranching origin. | Merriam-Webster: maverick | high |
| q148 | Language, pop culture, sports, and games | Scrabble was first developed under what earlier name? | Lexiko | Board-game history with a strange name. | National Scrabble Association and Hasbro history summaries | high |
| q149 | Language, pop culture, sports, and games | Atari famously buried thousands of unsold game cartridges in what U.S. state? | New Mexico | Pop-culture legend confirmed by excavation. | Smithsonian: Atari game cartridge landfill | high |
| q150 | Language, pop culture, sports, and games | The Ouija board patent test reportedly asked the board to spell what? | Patent officer's name | Weird product history, but "reportedly" keeps nuance. | Smithsonian: strange history of the Ouija board | medium |

## Thai Localization Ledger

| id | Thai question | Thai answer | localization note |
| --- | --- | --- | --- |
| q1 | ชาวกรีกและโรมันโบราณเคยใช้อะไรแทนผ้าพันแผล? | ใยแมงมุม | Natural Thai example style from the user's brief. |
| q2 | ชาวกรีกและโรมันบางคนใช้อะไรก่อนจะมีกระดาษชำระ? | ก้อนหิน | Uses the understandable object instead of the technical term `pessoi`. |
| q3 | ช่างซักผ้าโรมันโบราณใช้น้ำอะไรช่วยทำความสะอาดเสื้อผ้า? | ปัสสาวะ | Keeps the punchline short and funny. |
| q4 | ในโรคระบาดที่ Strasbourg ปี 1518 ผู้คนหยุดทำอะไรไม่ได้? | เต้น | Keeps Strasbourg in English as a place name. |
| q5 | ปี 1919 เมือง Boston เคยถูกของเหลวเหนียว ๆ อะไรท่วม? | กากน้ำตาล | Keeps Boston in English and localizes molasses naturally. |
| q6 | ปี 1814 ย่านหนึ่งใน London เคยถูกเครื่องดื่มอะไรท่วม? | เบียร์ | Keeps London in English for recognition. |
| q7 | กองทัพออสเตรเลียเคยปราบสัตว์อะไรไม่สำเร็จในปี 1932? | นกอีมู | Short setup, strong reveal. |
| q8 | ข่าวลวง Great Moon Hoax ปี 1835 อ้างว่าบนดวงจันทร์มีสิ่งมีชีวิตมีปีกแบบไหน? | มนุษย์ค้างคาว | Keeps event name in English and makes answer visual. |
| q9 | Mary Toft หลอกหมอในปี 1726 ว่าเธอคลอดอะไรออกมา? | กระต่าย | Keeps person's name in English. |
| q10 | นักดาราศาสตร์ Tycho Brahe เคยใส่อวัยวะเทียมที่ทำจากอะไรบางส่วน? | โลหะ | Keeps proper noun in English. |
| q11 | บันทึกโบราณเล่าว่า King Mithridates VI กินอะไรทีละนิดเพื่อสร้างภูมิต้านทาน? | ยาพิษ | Uses cautious wording matching the source nuance. |
| q12 | อังกฤษเคยเก็บภาษีบ้านจากจำนวนอะไร? | หน้าต่าง | Very short and easy to read aloud. |
| q13 | ช่วง Tulip Mania ในเนเธอร์แลนด์ ผู้คนเก็งกำไรกับอะไรอย่างบ้าคลั่ง? | หัวทิวลิป | Keeps event name in English because it is recognizable. |
| q14 | มื้อสุดท้ายตามตำนานของกษัตริย์สวีเดนองค์หนึ่งมีขนมครีมอะไรหลายชิ้น? | เซมลา | Keeps safer legendary wording. |
| q15 | ผู้ชนะมาราธอนโอลิมปิกปี 1904 เคยถูกให้สารกระตุ้นต้องห้ามชื่ออะไร? | สตริกนิน | Answer is a Thai transliteration of the drug. |
| q16 | ข่าว April Fools ของ BBC ปี 1957 อ้างว่าอาหารอะไรปลูกบนต้นไม้ได้? | สปาเกตตี | Keeps BBC and April Fools recognizable. |
| q17 | เหตุการณ์ Carrington ปี 1859 ทำให้เจ้าหน้าที่บางคนโดนช็อกจากอะไร? | สายโทรเลข | Keeps event name in English. |
| q18 | บันทึกยุโรปยุคกลางมีการพิจารณาคดีจำเลยที่ไม่ใช่มนุษย์กลุ่มไหน? | สัตว์ | Preserves cautious scope. |
| q19 | สงคราม Pig War ปี 1859 เริ่มจากคนอเมริกันยิงสัตว์อะไร? | หมู | Keeps event name in English for clarity. |
| q20 | ร้านอาหารเร็ว ๆ ใน Pompeii ที่นักโบราณคดีขุดพบเรียกว่าอะไร? | Thermopolia | Keeps the historical term in English/Latin form. |
| q21 | สัตว์อะไรขึ้นชื่อว่าอึออกมาเป็นก้อนสี่เหลี่ยม? | วอมแบต | Casual Thai, funny answer. |
| q22 | สัตว์เลี้ยงลูกด้วยนมวางไข่ชนิดไหนเรืองแสงสีเขียวฟ้าใต้แสง UV? | ตุ่นปากเป็ด | Uses common Thai animal name. |
| q23 | ซาลาแมนเดอร์ชนิดไหนงอกแขน ขากรรไกร และบางส่วนของหัวใจใหม่ได้? | แอกโซลอเติล | Thai transliteration keeps recognition. |
| q24 | สัตว์ทะเลอะไรใช้แขนเหมือนไม้กระบองต่อยได้แรงสุด ๆ? | กั้งตั๊กแตน | Natural Thai animal name. |
| q25 | สัตว์หน้าคล้ายปลาไหลชนิดไหนปล่อยเมือกจนเต็มปากนักล่าได้? | ปลาแฮกฟิช | Keeps fish name understandable. |
| q26 | สัตว์ทะเลอะไรสามารถพ่นอวัยวะภายในบางส่วนออกมาเพื่อป้องกันตัว? | ปลิงทะเล | Direct and weird. |
| q27 | สัตว์จิ๋วชนิดไหนทนสุญญากาศในอวกาศได้? | ทาร์ดิเกรด | Common Thai transliteration. |
| q28 | สัตว์อะไรมีเลือดสีฟ้า หัวใจสามดวง และหนีออกจากขวดเก่ง? | หมึกยักษ์ | Naturalizes octopus for Thai play. |
| q29 | นกอะไรจำหน้าคนได้นานหลายปี? | อีกา | Short and easy. |
| q30 | นกอะไรเลียนเสียงเลื่อยไฟฟ้าและเสียงชัตเตอร์กล้องได้? | นกไลร์เบิร์ด | Thai transliteration plus `นก`. |
| q31 | ฉลามชนิดไหนอาจมีชีวิตอยู่ได้นานหลายร้อยปี? | ฉลามกรีนแลนด์ | Natural Thai phrase. |
| q32 | แมงกะพรุนอะไรรีเซ็ตตัวเองกลับไปวัยเด็กได้เมื่อเครียด? | แมงกะพรุนอมตะ | Keeps the nickname rather than long species name. |
| q33 | ด้วงอะไรพ่นสารเคมีร้อน ๆ จากก้นได้? | ด้วงบอมบาร์เดียร์ | Funny and concise. |
| q34 | ปลาอะไรยิงน้ำใส่แมลงให้ตกลงน้ำได้? | ปลาเสือพ่นน้ำ | Common Thai name for archerfish. |
| q35 | กุ้งอะไรทำให้เหยื่อมึนด้วยฟองอากาศจากก้ามดีด? | กุ้งปืนพก | Natural Thai nickname. |
| q36 | สัตว์เลี้ยงลูกด้วยนมที่บินได้ชนิดไหนแบ่งอาหารที่สำรอกให้เพื่อนที่หิว? | ค้างคาวแวมไพร์ | Keeps the strange social behavior. |
| q37 | กบชนิดไหนอยู่รอดหน้าหนาวได้ด้วยการแช่แข็งตัวเองบางส่วน? | กบไม้ | Concise translation. |
| q38 | สัตว์ทะเลอะไรมีหนังหลวมใต้รักแร้ไว้ใช้เหมือนกระเป๋า? | นากทะเล | Visual and easy to bluff. |
| q39 | สัตว์กลุ่มไหนตัวผู้เป็นฝ่ายอุ้มท้อง? | ม้าน้ำ | Familiar Thai answer. |
| q40 | สัตว์โบราณอะไรมีเลือดสีฟ้าที่ใช้ทดสอบความปลอดภัยทางการแพทย์? | แมงดาทะเล | Uses familiar Thai equivalent. |
| q41 | ปลาปะการังอะไรนอนในถุงเมือกของตัวเอง? | ปลานกแก้ว | Strong weird image. |
| q42 | สัตว์มีกระเป๋าหน้าท้องอะไรมีลายนิ้วมือคล้ายมนุษย์? | โคอาลา | Natural Thai name. |
| q43 | สลอธปีนลงจากต้นไม้ประมาณสัปดาห์ละครั้งเพื่อทำอะไร? | อึ | Casual and funny. |
| q44 | แมลงอะไรถูกฝึกในการทดลองให้จำหน้าคนได้? | ผึ้ง | Short answer. |
| q45 | ช้างสื่อสารไกล ๆ ด้วยเสียงต่ำแบบไหน? | อินฟราซาวด์ | Technical answer kept concise. |
| q46 | งายาวของนาร์วาลจริง ๆ แล้วเป็นอวัยวะส่วนไหน? | ฟัน | Strong reveal. |
| q47 | สัตว์จมูกดาวอะไรดมกลิ่นใต้น้ำด้วยการเป่าฟองอากาศ? | ตุ่นจมูกดาว | Natural Thai phrase. |
| q48 | ปลาปักเป้าตัวผู้ทำลวดลายวงกลมใต้น้ำจากอะไร? | ทราย | Short and visual. |
| q49 | เชื้อราที่ทำให้มดปีนขึ้นที่สูงก่อนงอกออกมา มีชื่อเล่นว่าอะไร? | ราซอมบี้มด | Localized nickname for playability. |
| q50 | แมลงเรืองแสงอะไรสร้างแสงโดยแทบไม่เกิดความร้อน? | หิ่งห้อย | Familiar Thai answer. |
| q51 | ของเล่นเด็กอะไรเริ่มต้นจากน้ำยาทำความสะอาดวอลเปเปอร์เขม่าถ่าน? | Play-Doh | Keeps brand in English. |
| q52 | วัสดุกันกระแทกอะไรเคยถูกจินตนาการว่าจะขายเป็นวอลเปเปอร์ลายปุ่ม? | Bubble Wrap | Keeps product name in English. |
| q53 | ไอติมแท่งอะไรเริ่มจากเด็กคนหนึ่งลืมน้ำโซดากับไม้ไว้ข้างนอก? | Popsicle | Keeps U.S. product term. |
| q54 | ของเล่นอะไรเกิดจากวิศวกรเรือเห็นสปริงเดินตกจากชั้น? | Slinky | Keeps brand in English. |
| q55 | ของเล่นยืด ๆ อะไรเกิดจากความพยายามทำยางสังเคราะห์ช่วงสงคราม? | Silly Putty | Keeps brand in English. |
| q56 | ของใช้สำนักงานอะไรเกิดขึ้นเพราะกาวดันเหนียวไม่พอ? | Post-it Notes | Keeps brand in English. |
| q57 | ตัวยึดอะไรได้แรงบันดาลใจจากเมล็ดหญ้าเกาะขนหมา? | Velcro | Keeps brand/common product name in English. |
| q58 | เครื่องครัวอะไรเริ่มจากช็อกโกแลตละลายใกล้อุปกรณ์เรดาร์? | ไมโครเวฟ | Natural Thai common noun. |
| q59 | กาวอะไรถูกค้นพบตอนนักวิจัยกำลังหาพลาสติกใสทำศูนย์เล็งปืน? | Super Glue | Keeps common product name in English. |
| q60 | สีย้อมม่วงสังเคราะห์ตัวแรกเกิดจากการพยายามทำยาอะไรแล้วพลาด? | ควินิน | Thai transliteration. |
| q61 | ของเล่นอะไรได้ชื่อจากเหตุการณ์ที่ Theodore Roosevelt ไม่ยอมยิงหมี? | ตุ๊กตาหมี | Keeps person name in English. |
| q62 | ของเล่นบินได้อะไรเกี่ยวกับนักศึกษาที่โยนถาดพายเล่น? | Frisbee | Keeps product/sport item in English. |
| q63 | ของกันหนาวอะไรถูกจดสิทธิบัตรโดยวัยรุ่นจากรัฐ Maine? | ที่ปิดหู | Natural Thai object. |
| q64 | เครื่องแก้วอบขนมอะไรได้แรงบันดาลใจจากแก้วโคมไฟรถไฟทนความร้อน? | Pyrex | Keeps brand in English. |
| q65 | ซอส garum ของโรมันโบราณทำจากการหมักอะไร? | ไส้ปลา | Keeps garum in English/Latin form. |
| q66 | ซีเรียลอาหารเช้าอะไรเริ่มจากอาหารสุขภาพรสจืดแบบตั้งใจ? | คอร์นเฟลกส์ | Familiar Thai transliteration. |
| q67 | ผลไม้อะไรเคยถูกให้เช่าในอังกฤษเพื่อวางโชว์บนโต๊ะอาหาร? | สับปะรด | Natural Thai answer. |
| q68 | ถั่วอะไรขึ้นติดอยู่ใต้ผลไม้พอง ๆ? | เม็ดมะม่วงหิมพานต์ | Thai food name. |
| q69 | กลิ่นวานิลลามาจากฝักเมล็ดของพืชตระกูลไหน? | กล้วยไม้ | Natural Thai answer. |
| q70 | เครื่องเทศแพงที่สุดในโลกเก็บจากส่วนไหนของดอก crocus? | ยอดเกสร | Keeps crocus in English to avoid long explanation. |
| q71 | ซอส Worcestershire แบบดั้งเดิมมีปลาอะไรเป็นส่วนผสมลับ? | ปลาแอนโชวี | Keeps sauce name in English. |
| q72 | อาหาร hakarl ของไอซ์แลนด์ทำจากอะไรหมัก? | ฉลาม | Keeps food name in plain ASCII. |
| q73 | สเปรดอะไรทำจากสารสกัดยีสต์เข้มข้นจากการต้มเบียร์? | Marmite | Keeps brand in English. |
| q74 | ขนม marshmallow แบบเก่าตั้งชื่อตามส่วนไหนของต้นไม้? | รากมาร์ชแมลโลว์ | Keeps marshmallow recognizable. |
| q75 | ชีส casu marzu จาก Sardinia ขึ้นชื่อว่ามีอะไรที่ยังมีชีวิตอยู่ข้างใน? | หนอน | Keeps place/food names in English. |
| q76 | ในเทศกาล El Colacho ของสเปน คนแต่งเป็นปีศาจต้องกระโดดข้ามอะไร? | เด็กทารก | Matches the user's Thai style example. |
| q77 | ในเทศกาล La Tomatina ผู้คนขว้างอะไรใส่กัน? | มะเขือเทศ | Keeps festival name in English. |
| q78 | ที่ Cooper's Hill ผู้เข้าแข่งวิ่งไล่อะไรลงเนินชัน? | ชีส | Keeps event place in English. |
| q79 | รางวัล Wife Carrying World Championship จ่ายเป็นอะไรตามน้ำหนักคู่แข่ง? | เบียร์ | Keeps event name in English. |
| q80 | งาน Night of the Radishes ที่ Oaxaca แกะสลักอะไรเป็นงานโชว์? | หัวไชเท้า | Keeps event/place names in English. |
| q81 | งาน Lopburi Monkey Buffet ของไทยจัดอาหารให้สัตว์อะไร? | ลิงแสม | Local Thai relevance. |
| q82 | Battle of the Oranges ในอิตาลีใช้อะไรเป็นกระสุน? | ส้ม | Keeps event name in English. |
| q83 | ฟินแลนด์มีชิงแชมป์โลกการแกล้งเล่นเครื่องดนตรีอะไร? | กีตาร์ลม | Natural Thai for air guitar. |
| q84 | การแข่ง Naki Sumo ของญี่ปุ่นพยายามทำให้ผู้เข้าแข่งแบบไหนร้องไห้? | เด็กทารก | Keeps event name in English. |
| q85 | เทศกาล Up Helly Aa ของสกอตแลนด์จบด้วยการเผาเรือจำลองแบบไหน? | เรือไวกิง | Keeps festival name in English. |
| q86 | เทศกาลที่ Haro ในสเปนกลายเป็นการรบด้วยเครื่องดื่มอะไร? | ไวน์ | Keeps Haro in English. |
| q87 | ในการแข่ง worm charming ผู้เข้าแข่งพยายามล่ออะไรขึ้นมาจากดิน? | ไส้เดือน | Keeps event phrase in English. |
| q88 | World Toe Wrestling Championship แข่งกันด้วยอวัยวะส่วนไหน? | นิ้วเท้า | Keeps event name in English. |
| q89 | เมือง Boryeong เกาหลีใต้ มีเทศกาลฤดูร้อนที่เล่นกับอะไร? | โคลน | Keeps city name in English. |
| q90 | สงกรานต์ของไทยขึ้นชื่อเรื่องการสู้กันด้วยอะไร? | น้ำ | Familiar Thai context. |
| q91 | เทศกาลดังประจำปีที่ Albuquerque ทำให้ท้องฟ้าเต็มไปด้วยอะไร? | บอลลูน | Keeps city name in English. |
| q92 | World Bog Snorkelling ให้ผู้เข้าแข่งลุยผ่านอะไร? | บึงพีต | Keeps event name in English. |
| q93 | กีฬา Highland games มีการโยนเสาไม้ยาวที่เรียกว่าอะไร? | Caber | Keeps technical sport term in English. |
| q94 | Nenana Ice Classic พนันกันว่าขาตั้งจะขยับบนอะไรเมื่อไหร่? | น้ำแข็งแม่น้ำ | Keeps event name in English. |
| q95 | เทศกาล Cheung Chau ของฮ่องกงมีการปีนหอคอยที่คลุมด้วยอะไร? | ซาลาเปา | Naturalizes buns for Thai players. |
| q96 | Kevin Shelley เคยใช้หัวโหม่งอะไรให้แตก 46 อันใน 1 นาที? | ฝาชักโครก | Matches user style example. |
| q97 | เจ้าของสถิติ Guinness คนหนึ่งเคยวางอะไรบนหน้าได้ 31 อัน? | ช้อน | Keeps Guinness in English. |
| q98 | Toby สุนัขพันธุ์ whippet ทำสถิติป๊อปอะไรได้ 100 ลูก? | ลูกโป่ง | Keeps dog name/breed in English. |
| q99 | Charles Osborne ถือสถิติอาการอะไรที่นานที่สุด? | สะอึก | Keeps person name in English. |
| q100 | สถิติของเล่นอาบน้ำที่ใหญ่ที่สุดเป็นของยางลอยน้ำรูปอะไร? | เป็ดยาง | Natural Thai answer. |
| q101 | นกแก้วชื่อ Smudge ทำสถิติถอดอะไรออกจากห่วง? | กุญแจ | Keeps parrot name in English. |
| q102 | Chad Fell ทำสถิติเป่าฟองยักษ์ด้วยอะไร? | หมากฝรั่ง | Keeps person name in English. |
| q103 | Pete Glazebrook ทำสถิติปลูกอะไรที่ใหญ่สุด ๆ? | หัวหอม | Keeps person name in English. |
| q104 | เจ้าของสถิติ Guinness บางคนถูกวัดความยาวของอะไรที่ยาวผิดปกติ? | เล็บมือ | Keeps Guinness in English. |
| q105 | Suresh Joachim ทำสถิติด้วยการนั่งอะไรไกล 140 ไมล์? | บันไดเลื่อน | Keeps person name in English. |
| q106 | คอลเลกชันของ Charlotte Lee มีของเล่นอาบน้ำอะไรหลายพันตัว? | เป็ดยาง | Keeps collector name in English. |
| q107 | Tillman สุนัขบูลด็อกทำสถิติความเร็วด้วยการขี่อะไร? | สเกตบอร์ด | Keeps dog name in English. |
| q108 | คอลเลกชันของ Val Kolpakov มีหลอดอะไรหลายพันหลอด? | ยาสีฟัน | Keeps collector name in English. |
| q109 | สุนัขชื่อ Ranmaru เคยมีสถิติอะไรที่ยาวผิดปกติ? | ขนตา | Keeps dog name in English. |
| q110 | สถิติคลาส Zumba ที่ใหญ่ที่สุดมีอะไรเข้าร่วมเกือบ 13,000 คน? | คนเต้น | Keeps Zumba in English. |
| q111 | บนสถานีอวกาศ NASA รีไซเคิลปัสสาวะและเหงื่อให้กลายเป็นอะไร? | น้ำดื่ม | Keeps NASA in English. |
| q112 | นักบินอวกาศ Apollo ต้องใช้ถุงพลาสติกติดกาวแทนอะไร? | ห้องน้ำ | Keeps Apollo in English. |
| q113 | นักบินอวกาศใส่ Maximum Absorbency Garments ซึ่งพูดง่าย ๆ คืออะไร? | ผ้าอ้อม | Keeps formal garment name in English. |
| q114 | นักบิน Apollo บอกว่าฝุ่นดวงจันทร์มีกลิ่นเหมือนอะไร? | ดินปืน | Keeps Apollo in English. |
| q115 | หลังอยู่ในสภาพไร้น้ำหนัก นักบินอวกาศอาจตัวเป็นอย่างไรชั่วคราว? | สูงขึ้น | Natural Thai phrase. |
| q116 | ดาวเคราะห์ดวงไหนมีหนึ่งวันยาวกว่าหนึ่งปีของมันเอง? | ดาวศุกร์ | Natural Thai planet name. |
| q117 | ดาวเคราะห์ดวงไหนหมุนเอียงแทบจะนอนตะแคง? | ดาวยูเรนัส | Natural Thai planet name. |
| q118 | ดวงจันทร์ Titan ของดาวเสาร์มีทะเลสาบที่เต็มไปด้วยอะไรเป็นหลัก? | มีเทน | Keeps Titan in English. |
| q119 | พระอาทิตย์ตกบนดาวอังคารมักเห็นเป็นสีอะไรใกล้ดวงอาทิตย์? | สีฟ้า | Natural Thai answer. |
| q120 | ดาวพุธมีอะไรที่กลายเป็นน้ำแข็งซ่อนอยู่ในหลุมเงามืดถาวร? | น้ำ | Short answer avoids over-explaining water ice. |
| q121 | สิ่งมีชีวิตจิ๋ว Demodex ที่อยู่บนหน้าคนจำนวนมากคืออะไร? | ไร | Keeps scientific name in English. |
| q122 | ฝุ่นในบ้านจำนวนมากมาจากเศษอะไรของคน? | ผิวหนัง | Natural Thai answer. |
| q123 | กระเพาะอาหารปกป้องตัวเองจากกรดด้วยชั้นเคลือบอะไร? | เมือก | Natural Thai answer. |
| q124 | ยีนหนึ่งช่วยกำหนดว่าขี้หูของคุณเปียกหรืออะไร? | แห้ง | Casual and short. |
| q125 | กระดูกสามชิ้นที่เล็กที่สุดในร่างกายอยู่ตรงส่วนไหน? | หู | Short answer. |
| q126 | เด็กทารกเริ่มชีวิตด้วยจำนวนอะไรที่มากกว่าผู้ใหญ่? | กระดูก | Natural Thai answer. |
| q127 | ร่างกายมนุษย์ปล่อยแสงที่ตามองไม่เห็น ต้องใช้อะไรถึงจับได้? | กล้อง | Short and conversational. |
| q128 | ในวงโคจร เปลวไฟมักลุกเป็นรูปทรงอะไร? | ทรงกลม | Natural Thai answer. |
| q129 | น้ำที่ลอยในสภาพไร้น้ำหนักจะรวมตัวเป็นรูปทรงอะไร? | ทรงกลม | Natural Thai answer. |
| q130 | สถานีอวกาศ ISS โคจรรอบโลกประมาณทุกกี่นาที? | 90 นาที | Keeps ISS in English. |
| q131 | ดาวศุกร์ถูกปกคลุมด้วยเมฆที่ส่วนใหญ่ทำจากกรดอะไร? | กรดซัลฟิวริก | Natural Thai science phrase. |
| q132 | ตามแบบจำลองบางแบบ ดาวเคราะห์ดวงไหนมีฝนเพชร? | ดาวเนปจูน | Natural Thai planet name. |
| q133 | ดวงจันทร์ดวงไหนมีไกเซอร์พ่นน้ำออกสู่อวกาศ? | Enceladus | Keeps moon name in English. |
| q134 | NOAA ใช้ชื่ออะไรเรียกจุดที่ลึกที่สุดในมหาสมุทร? | Challenger Deep | Keeps official proper noun in English. |
| q135 | สิ่งมีชีวิตยักษ์ Pando ใน Utah ส่วนใหญ่ประกอบด้วยอะไรนับพันต้น? | ลำต้นแอสเพน | Keeps Pando/Utah in English. |
| q136 | ที่ Point Nemo คนที่อยู่ใกล้ที่สุดมักเป็นคนบนอะไร? | สถานีอวกาศ | Keeps place name in English. |
| q137 | ปล่องไฟ Darvaza ที่ลุกไหม้ใน Turkmenistan มีฉายาว่าประตูสู่อะไร? | นรก | Keeps place names in English. |
| q138 | ถ้าวัดจากฐานใต้ทะเล ภูเขาอะไรสูงกว่า Everest? | Mauna Kea | Keeps mountain names in English. |
| q139 | Lake Hillier ในออสเตรเลียตะวันตกดังเพราะมีสีอะไร? | สีชมพู | Keeps lake name in English. |
| q140 | Salar de Uyuni ในโบลิเวียเป็นพื้นที่ราบที่ใหญ่ที่สุดของอะไร? | เกลือ | Keeps place name in English. |
| q141 | ไอซ์แลนด์ขึ้นชื่อว่าแทบไม่มีแมลงกัดชนิดไหนเป็นสัตว์พื้นถิ่น? | ยุง | Natural Thai answer. |
| q142 | จุดเล็ก ๆ เหนือตัว i หรือ j ภาษาอังกฤษเรียกว่าอะไร? | Tittle | Keeps rare English word. |
| q143 | สัญลักษณ์อะไรเคยถูกเด็กนักเรียนท่องต่อจากตัว Z? | Ampersand | Keeps symbol name in English. |
| q144 | คำว่า robot มาจากคำเช็กที่เกี่ยวกับอะไร? | แรงงานบังคับ | Keeps robot in English. |
| q145 | เทคโนโลยี Bluetooth ตั้งชื่อตามกษัตริย์ที่เกี่ยวข้องกับประเทศอะไร? | เดนมาร์ก | Keeps Bluetooth in English. |
| q146 | คำว่า spam email เกี่ยวข้องกับสเกตช์ของคณะตลกอะไร? | Monty Python | Keeps comedy group in English. |
| q147 | คำว่า maverick เดิมหมายถึงสัตว์อะไรที่ยังไม่ถูกตีตรา? | ลูกวัว | Keeps English word being explained. |
| q148 | เกม Scrabble ตอนแรกพัฒนาขึ้นในชื่ออะไร? | Lexiko | Keeps game names in English. |
| q149 | Atari เคยฝังตลับเกมขายไม่ออกจำนวนมากไว้ในรัฐไหนของสหรัฐฯ? | New Mexico | Keeps brand/state in English. |
| q150 | ตอนทดสอบสิทธิบัตร กระดาน Ouija ถูกขอให้สะกดอะไร? | ชื่อเจ้าหน้าที่ | Keeps board name in English. |

## Excluded Or Rejected Facts

These were not included in the final deck because they are viral myths, too disputed, too nuanced, too dark, or too hard to verify cleanly for a casual party game.

- "Switzerland bans flushing toilets after 10 PM." Excluded because this is usually an overgeneralized apartment-noise myth, not a clear national rule.
- "Boston bans a specific animal from the back seat of a car." Excluded because the common versions are poorly sourced and inconsistent.
- "The Soviet Union traded Pepsi a fleet of warships." Excluded because the viral version is oversimplified and often misleading.
- "Samoa makes forgetting your wife's birthday illegal." Excluded because reliable sourcing is weak and repeated versions conflict.
- "Singapore completely bans chewing gum." Excluded because the true rule is more nuanced than the viral wording.
- "Humans swallow eight spiders a year while sleeping." Excluded as a well-known false internet myth.
- "Penguins propose with pebbles." Excluded because the popular wording is anthropomorphized and misleading.
- "Twinkies never expire." Excluded because it is false.
- "Coffee was discovered by dancing goats." Excluded because it is a legend, not a verified fact.
- "Potato chips were invented by an angry chef trying to annoy a customer." Excluded because the origin story is disputed.
- "Lake Nyos released deadly carbon dioxide." Excluded from the final deck despite being real because the tone is too grim for this party deck.

## Source Notes

Representative sources used during curation include:

- Smithsonian: https://www.smithsonianmag.com/
- Britannica: https://www.britannica.com/
- NASA: https://www.nasa.gov/
- NOAA Ocean Exploration: https://oceanexplorer.noaa.gov/
- National Geographic: https://www.nationalgeographic.com/
- Guinness World Records: https://www.guinnessworldrecords.com/
- BBC: https://www.bbc.com/
- Atlas Obscura: https://www.atlasobscura.com/
- Merriam-Webster: https://www.merriam-webster.com/
- USDA Forest Service: https://www.fs.usda.gov/
- Tourism Authority of Thailand: https://www.tourismthailand.org/

## Maintenance Rules

- Keep the deck at exactly 150 questions unless a later milestone changes that target.
- Keep IDs sequential from `q1` to `q150`.
- Keep answers concise, preferably 1 to 5 words.
- Do not include low-confidence facts.
- If replacing a question, update both `lib/questions.ts` and this research ledger.
- Re-run the deck validation checks in `docs/TEST_PLAN.md`.
