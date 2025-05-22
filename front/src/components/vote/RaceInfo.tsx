import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverStats } from "@/lib/types/drivers";
import { Button } from "@/components/ui/button";
import { RiSunLine} from "react-icons/ri";

interface RaceInfoProps {
  drivers: DriverStats[];
  totalVotes: number;
  topVotedDrivers: { driverId: string; votes: number }[];
}

export const RaceInfo = ({ drivers, totalVotes, topVotedDrivers }: RaceInfoProps) => {
  const previousRaces = [
    { race: "GP d'Australie", driver: "Lewis Hamilton", position: "10" },
    { race: "GP d'Arabie Saoudite", driver: "Fernando Alonso", position: "10" },
    { race: "GP de Bahreïn", driver: "Lance Stroll", position: "10" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Grand Prix de Monaco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Circuit de Monaco</p>
              <p>Date: 26 Mai 2024</p>
              <p>Heure de départ: 15:00</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Conditions météo</h3>
              <div className="flex items-center gap-2">
                <RiSunLine className="text-yellow-500 text-xl" />
                <p>Ensoleillé, 24°C</p>
              </div>
              <p className="text-sm text-gray-500">Humidité: 65%</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Points en jeu</h3>
              <p>1 point pour le 10ème</p>
            </div>

            <Button variant="outline" className="w-full">
              Voir le classement du championnat
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques de vote</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Total des votes: {totalVotes}</p>
            <div>
              <h3 className="font-semibold mb-2">Top 3 des votes</h3>
              <div className="space-y-2">
                {topVotedDrivers.map((driver, index) => {
                  const driverInfo = drivers.find(d => d.driverId === driver.driverId);
                  const percentage = ((driver.votes / totalVotes) * 100).toFixed(1);
                  return (
                    <div key={driver.driverId} className="flex justify-between items-center">
                      <span>{index + 1}. {driverInfo?.name}</span>
                      <span>{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Informations importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="rules">Règles</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <div className="space-y-4">
                <h3 className="font-semibold">Derniers 10èmes</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {previousRaces.map((race) => (
                    <div key={race.race} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{race.race}</p>
                      <p>{race.driver}</p>
                      <p className="text-sm text-gray-500">Position: {race.position}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="rules">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Comment voter ?</h3>
                  <p>1. Sélectionnez le pilote que vous pensez finir 10ème</p>
                  <p>2. Cliquez sur le bouton &quot;Voter&quot;</p>
                  <p>3. Vous pouvez modifier votre vote jusqu&apos;à la clôture</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Clôture des votes</h3>
                  <p>Les votes sont clôturés 5 minutes avant le départ de la course</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Attribution des points</h3>
                  <p>• 3 points si vous avez voté pour le bon pilote</p>
                  <p>• 1 point si le pilote finit dans les 3 positions autour (8-12)</p>
                  <p>• 0 point dans les autres cas</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}; 