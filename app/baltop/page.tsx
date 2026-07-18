"use client";

import { useEffect, useState } from "react";

export default function BaltopPage() {

  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  async function loadBaltop() {

    try {

      const res = await fetch("/api/baltop", {
        cache: "no-store",
      });

      const data = await res.json();

      setPlayers(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    loadBaltop();

    const interval =
      setInterval(loadBaltop, 30000);


    return () =>
      clearInterval(interval);

  }, []);



  const medals = [
    "🥇",
    "🥈",
    "🥉"
  ];



  return (

    <main className="
      min-h-screen
      bg-gradient-to-b
      from-zinc-950
      via-zinc-900
      to-black
      text-white
      px-4
      sm:px-6
      py-16
    ">


      <div className="
        mx-auto
        max-w-6xl
      ">


        {/* HEADER */}

        <div className="text-center">


          <h1 className="
            text-4xl
            sm:text-6xl
            font-black
            bg-gradient-to-r
            from-yellow-400
            via-green-400
            to-cyan-400
            bg-clip-text
            text-transparent
          ">

            💰 Baltop

          </h1>



          <p className="
            mt-4
            text-sm
            sm:text-lg
            text-zinc-400
          ">

            Top 20 người chơi giàu nhất
            Craftopia Survival

          </p>


        </div>





        {loading ? (

          <div className="
            mt-20
            text-center
            text-zinc-400
            animate-pulse
          ">

            Đang tải bảng xếp hạng...

          </div>


        ) : players.length === 0 ? (

          <div className="
            mt-20
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            p-10
            text-center
          ">

            Chưa có dữ liệu Baltop

          </div>


        ) : (

          <>


          {/* TOP 3 */}


          <div className="
            mt-14
            grid
            gap-6
            md:grid-cols-3
          ">


            {players
              .slice(0,3)
              .map((player,index)=>(


              <div
                key={player.player}
                className={`
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-zinc-900/80
                  backdrop-blur-xl
                  p-8
                  text-center
                  shadow-2xl
                  transition
                  hover:-translate-y-2

                  ${
                    index===0
                    ?
                    "border-yellow-400 shadow-yellow-500/20"
                    :
                    index===1
                    ?
                    "border-zinc-400"
                    :
                    "border-orange-500"
                  }
                `}
              >


                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-b
                  from-white/5
                  to-transparent
                "/>


                <div className="
                  relative
                  text-6xl
                ">

                  {medals[index]}

                </div>



                <h2 className="
                  relative
                  mt-5
                  text-2xl
                  font-black
                  truncate
                ">

                  {player.player}

                </h2>



                <p className="
                  relative
                  mt-4
                  text-xl
                  sm:text-2xl
                  font-black
                  text-green-400
                ">

                  💰 {Number(player.money)
                    .toLocaleString()}

                </p>


              </div>


            ))}


          </div>






          {/* LIST */}


          <div className="
            mt-12
            space-y-4
          ">


          {players
            .slice(3,20)
            .map((player,index)=>(


            <div
              key={player.player}
              className="
                flex
                items-center
                justify-between
                gap-3
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-4
                sm:p-5
                transition
                hover:border-green-500
                hover:bg-zinc-800
              "
            >



              <div className="
                flex
                items-center
                gap-3
                min-w-0
              ">


                <div className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-zinc-800
                  font-black
                  text-green-400
                ">

                  #{index+4}

                </div>



                <span className="
                  font-bold
                  truncate
                  max-w-[150px]
                  sm:max-w-none
                ">

                  {player.player}

                </span>


              </div>




              <span className="
                whitespace-nowrap
                text-sm
                sm:text-lg
                font-black
                text-green-400
              ">

                💰 {Number(player.money)
                  .toLocaleString()}

              </span>



            </div>


          ))}


          </div>


          </>

        )}


      </div>


    </main>

  );

}
