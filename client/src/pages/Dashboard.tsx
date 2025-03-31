import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePoints } from "@/context/PointsContext";
import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "@/lib/openai";
import { getImageHistory } from "@/lib/openai";
import { getCodeHistory } from "@/lib/openai";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Helmet } from "react-helmet";
import { UserCircle, MessageSquare, Image, Code, Coins, Clock } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useLocation } from "wouter";

const Dashboard = () => {
  const { user } = useAuth();
  const { points, transactions } = usePoints();
  const [, setLocation] = useLocation();
  
  // If not authenticated, redirect to home
  if (!user) {
    setLocation("/");
    return null;
  }

  // Fetch chat, image and code history
  const { data: chatHistory } = useQuery({
    queryKey: ['/api/chat/history'],
    queryFn: getChatHistory
  });

  const { data: imageHistory } = useQuery({
    queryKey: ['/api/image/history'],
    queryFn: getImageHistory
  });

  const { data: codeHistory } = useQuery({
    queryKey: ['/api/code/history'],
    queryFn: getCodeHistory
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy, HH:mm", { locale: tr });
  };

  return (
    <>
      <Helmet>
        <title>Kullanıcı Profili - ZekiBot</title>
        <meta name="description" content="ZekiBot kullanıcı profili ve geçmiş işlemler" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with user info */}
          <div className="lg:col-span-1">
            <Card className="bg-dark-surface border-dark-lighter">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl mb-4">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <CardTitle className="text-xl">{user.username}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center p-4 bg-dark-lighter rounded-lg">
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 text-accent mr-2" />
                    <span className="text-light-muted">Puanlarınız</span>
                  </div>
                  <span className="text-accent font-bold text-xl">{points}</span>
                </div>
                <div className="text-xs text-light-muted text-center mt-4">
                  Üyelik tarihi: {user.createdAt ? formatDate(user.createdAt) : "Bilinmiyor"}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="activities">
              <TabsList className="bg-dark-surface border-dark-lighter mb-4">
                <TabsTrigger value="activities" className="data-[state=active]:bg-primary">
                  <Clock className="h-4 w-4 mr-2" />
                  Aktiviteler
                </TabsTrigger>
                <TabsTrigger value="points" className="data-[state=active]:bg-primary">
                  <Coins className="h-4 w-4 mr-2" />
                  Puan İşlemleri
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities">
                <Card className="bg-dark-surface border-dark-lighter">
                  <CardHeader>
                    <CardTitle>Aktivite Geçmişi</CardTitle>
                    <CardDescription>Tüm AI etkileşimleriniz</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="chat">
                      <TabsList className="bg-dark-lighter mb-4">
                        <TabsTrigger value="chat">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Sohbet
                        </TabsTrigger>
                        <TabsTrigger value="images">
                          <Image className="h-4 w-4 mr-2" />
                          Görseller
                        </TabsTrigger>
                        <TabsTrigger value="code">
                          <Code className="h-4 w-4 mr-2" />
                          Kod
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="chat">
                        {chatHistory && chatHistory.length > 0 ? (
                          <div className="rounded-md border border-dark-lighter">
                            <Table>
                              <TableHeader>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableHead className="w-[100px]">Tarih</TableHead>
                                  <TableHead>Mesaj</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {chatHistory.map((chat: any) => (
                                  <TableRow key={chat.id} className="hover:bg-dark-lighter border-dark-lighter">
                                    <TableCell className="text-light-muted">
                                      {chat.createdAt ? formatDate(chat.createdAt) : "Bilinmiyor"}
                                    </TableCell>
                                    <TableCell className="text-light truncate max-w-[500px]">
                                      {chat.message}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-center p-4 bg-dark-lighter rounded-md">
                            <MessageSquare className="h-12 w-12 mx-auto text-light-muted mb-2" />
                            <p>Henüz sohbet geçmişiniz bulunmuyor.</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="images">
                        {imageHistory && imageHistory.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {imageHistory.map((image: any) => (
                              <Card key={image.id} className="bg-dark-lighter border-dark-lighter">
                                <CardContent className="p-3">
                                  <div className="aspect-square rounded-md overflow-hidden mb-2">
                                    <img 
                                      src={image.imageUrl} 
                                      alt={image.prompt} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <p className="text-sm text-light-muted truncate">{image.prompt}</p>
                                  <p className="text-xs text-light-muted mt-1">
                                    {image.createdAt ? formatDate(image.createdAt) : "Bilinmiyor"}
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4 bg-dark-lighter rounded-md">
                            <Image className="h-12 w-12 mx-auto text-light-muted mb-2" />
                            <p>Henüz görsel oluşturma geçmişiniz bulunmuyor.</p>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="code">
                        {codeHistory && codeHistory.length > 0 ? (
                          <div className="space-y-4">
                            {codeHistory.map((code: any) => (
                              <Card key={code.id} className="bg-dark-lighter border-dark-lighter">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm">
                                    {code.prompt}
                                  </CardTitle>
                                  <CardDescription>
                                    Dil: {code.language} | 
                                    {code.createdAt ? formatDate(code.createdAt) : "Bilinmiyor"}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <pre className="bg-dark rounded-md p-2 overflow-x-auto text-xs">
                                    <code>{code.code.length > 200 ? `${code.code.substring(0, 200)}...` : code.code}</code>
                                  </pre>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4 bg-dark-lighter rounded-md">
                            <Code className="h-12 w-12 mx-auto text-light-muted mb-2" />
                            <p>Henüz kod oluşturma geçmişiniz bulunmuyor.</p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="points">
                <Card className="bg-dark-surface border-dark-lighter">
                  <CardHeader>
                    <CardTitle>Puan İşlemleri</CardTitle>
                    <CardDescription>Puan kazanma ve harcama geçmişiniz</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions && transactions.length > 0 ? (
                      <div className="rounded-md border border-dark-lighter">
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                              <TableHead className="w-[180px]">Tarih</TableHead>
                              <TableHead>Açıklama</TableHead>
                              <TableHead className="text-right">Miktar</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {transactions.map((transaction: any) => (
                              <TableRow key={transaction.id} className="hover:bg-dark-lighter border-dark-lighter">
                                <TableCell className="text-light-muted">
                                  {transaction.createdAt ? formatDate(transaction.createdAt) : "Bilinmiyor"}
                                </TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className={`text-right ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-dark-lighter rounded-md">
                        <Coins className="h-12 w-12 mx-auto text-light-muted mb-2" />
                        <p>Henüz puan işlemi geçmişiniz bulunmuyor.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
