import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet";
import { 
  Shield, 
  Users, 
  Coins, 
  Plus, 
  UserCircle, 
  Settings, 
  LineChart, 
  Activity,
  Palette, 
  MessageSquare, 
  Image as ImageIcon, 
  Code, 
  Play,
  BarChart4,
  UserCog,
  PaintBucket,
  Bot,
  KeyRound, 
  CalendarDays,
  ScrollText,
  RefreshCw,
  FileText,
  Edit,
  Trash2,
  Home,
  Menu,
  Monitor,
  Layout,
  Layers,
  Globe,
  Upload,
  Pencil,
  Save
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const addPointsSchema = z.object({
  userId: z.number({
    required_error: "Kullanıcı ID gerekli",
  }),
  amount: z.number({
    required_error: "Miktar gerekli",
  }).int().min(1, {
    message: "Miktar 1 veya daha fazla olmalıdır",
  }),
  description: z.string({
    required_error: "Açıklama gerekli",
  }).min(3, {
    message: "Açıklama en az 3 karakter olmalıdır",
  })
});

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddPointsDialogOpen, setIsAddPointsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // If not authenticated or not admin, redirect to home
  if (!user || !isAdmin) {
    setLocation("/");
    return null;
  }

  // Fetch all users
  const { data: users, isLoading } = useQuery({
    queryKey: ['/api/admin/users'],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/users");
      return response.json();
    }
  });

  // Add points mutation
  const { mutate: addPoints, isPending: isAddingPoints } = useMutation({
    mutationFn: async (data: z.infer<typeof addPointsSchema>) => {
      const response = await apiRequest("POST", "/api/admin/add-points", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Başarılı!",
        description: "Puanlar başarıyla eklendi.",
      });
      setIsAddPointsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['/api/admin/users'] });
    },
    onError: (error: any) => {
      toast({
        title: "Hata!",
        description: error.message || "Puan eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  });

  // Add points form
  const form = useForm<z.infer<typeof addPointsSchema>>({
    resolver: zodResolver(addPointsSchema),
    defaultValues: {
      userId: 0,
      amount: 10,
      description: "Admin tarafından eklenen puan"
    }
  });

  const openAddPointsDialog = (user: any) => {
    setSelectedUser(user);
    form.setValue("userId", user.id);
    setIsAddPointsDialogOpen(true);
  };

  const onSubmit = (data: z.infer<typeof addPointsSchema>) => {
    addPoints(data);
  };

  // Fetch AI Models
  const { data: aiModels } = useQuery({
    queryKey: ['/api/ai-models'],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/ai-models");
      return response.json();
    }
  });

  // Mock transaction statistics
  const mockTransactions = [
    { date: '01.03.2024', count: 45 },
    { date: '02.03.2024', count: 38 },
    { date: '03.03.2024', count: 52 },
    { date: '04.03.2024', count: 73 },
    { date: '05.03.2024', count: 65 },
    { date: '06.03.2024', count: 59 },
    { date: '07.03.2024', count: 44 },
    { date: '08.03.2024', count: 51 },
    { date: '09.03.2024', count: 67 },
    { date: '10.03.2024', count: 63 }
  ];
  
  return (
    <>
      <Helmet>
        <title>Yönetici Paneli - ZekiBot</title>
        <meta name="description" content="ZekiBot yönetici paneli" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold flex items-center">
              <Shield className="mr-2 h-7 w-7 text-primary" />
              Yönetici Paneli
            </h1>
            <p className="text-light-muted mt-2">
              Sistem ayarları ve kullanıcı yönetimi
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Verileri Yenile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-dark-surface border-dark-lighter">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Kullanıcılar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users?.length || 0}</div>
              <p className="text-light-muted text-sm">Toplam kayıtlı kullanıcı</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-surface border-dark-lighter">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-secondary" />
                Yöneticiler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {users?.filter((u: any) => u.isAdmin).length || 0}
              </div>
              <p className="text-light-muted text-sm">Yönetici yetkisine sahip kullanıcı</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-surface border-dark-lighter">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Coins className="mr-2 h-5 w-5 text-accent" />
                Ortalama Puan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {users?.length 
                  ? Math.round(users.reduce((acc: number, user: any) => acc + user.points, 0) / users.length) 
                  : 0}
              </div>
              <p className="text-light-muted text-sm">Kullanıcı başına ortalama puan</p>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-surface border-dark-lighter">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-primary" />
                AI Modeller
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {aiModels?.length || 0}
              </div>
              <p className="text-light-muted text-sm">Aktif yapay zeka modeli</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="mt-8">
          <TabsList className="grid grid-cols-6 bg-dark-lighter rounded-md p-1 mb-6">
            <TabsTrigger value="users" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
              <UserCog className="h-4 w-4 mr-2" />
              Kullanıcılar
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
              <BarChart4 className="h-4 w-4 mr-2" />
              İstatistikler
            </TabsTrigger>
            <TabsTrigger value="ai-models" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
              <Bot className="h-4 w-4 mr-2" />
              AI Modeller
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
              <KeyRound className="h-4 w-4 mr-2" />
              API Anahtarları
            </TabsTrigger>
            <TabsTrigger value="appearance" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
              <PaintBucket className="h-4 w-4 mr-2" />
              Görünüm
            </TabsTrigger>
            <TabsTrigger value="content" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              İçerik Yönetimi
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="bg-dark-surface border-dark-lighter">
              <CardHeader>
                <CardTitle>Kullanıcı Listesi</CardTitle>
                <CardDescription>Tüm kayıtlı kullanıcılar ve puan durumları</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center p-4">
                    <p>Kullanıcılar yükleniyor...</p>
                  </div>
                ) : users && users.length > 0 ? (
                  <div className="rounded-md border border-dark-lighter">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                          <TableHead className="w-[50px]">ID</TableHead>
                          <TableHead>Kullanıcı Adı</TableHead>
                          <TableHead>E-posta</TableHead>
                          <TableHead className="text-center">Puan</TableHead>
                          <TableHead className="text-center">Yönetici</TableHead>
                          <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user: any) => (
                          <TableRow key={user.id} className="hover:bg-dark-lighter border-dark-lighter">
                            <TableCell>{user.id}</TableCell>
                            <TableCell className="font-medium">{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-center">{user.points}</TableCell>
                            <TableCell className="text-center">
                              {user.isAdmin ? (
                                <span className="text-primary">Evet</span>
                              ) : (
                                <span className="text-light-muted">Hayır</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="hover:bg-primary/20"
                                onClick={() => openAddPointsDialog(user)}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Puan Ekle
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-dark-lighter rounded-md">
                    <Users className="h-12 w-12 mx-auto text-light-muted mb-2" />
                    <p>Henüz kullanıcı bulunmuyor.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-dark-surface border-dark-lighter">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-primary" />
                    Kullanım İstatistikleri
                  </CardTitle>
                  <CardDescription>Son 10 günlük kullanım analizi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-dark-lighter rounded-md p-4 flex items-center justify-center">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-primary font-semibold">Günlük İşlem Sayısı</div>
                        <div className="text-light-muted text-sm">Son güncelleme: 10.03.2024</div>
                      </div>
                      <div className="h-64 relative">
                        <div className="absolute left-0 bottom-0 w-full h-full flex items-end">
                          {mockTransactions.map((trans, index) => (
                            <div key={index} className="flex-1 h-full flex flex-col justify-end items-center">
                              <div className="text-xs text-light-muted mb-1">{trans.count}</div>
                              <div 
                                className="w-4/5 bg-primary/40 hover:bg-primary/60 rounded-t-sm transition-all duration-200"
                                style={{ height: `${(trans.count / 80) * 100}%` }}
                              ></div>
                              <div className="text-xs text-light-muted mt-1 rotate-45 origin-left">{trans.date}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-surface border-dark-lighter">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-secondary" />
                    Popüler Hizmetler
                  </CardTitle>
                  <CardDescription>En çok kullanılan özellikler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                          Yapay Zeka Sohbet
                        </div>
                        <span className="text-light-muted">42%</span>
                      </div>
                      <div className="w-full bg-dark-lighter rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2 text-secondary" />
                          Görsel Oluşturma
                        </div>
                        <span className="text-light-muted">28%</span>
                      </div>
                      <div className="w-full bg-dark-lighter rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Code className="h-4 w-4 mr-2 text-accent" />
                          Kod Yazımı
                        </div>
                        <span className="text-light-muted">18%</span>
                      </div>
                      <div className="w-full bg-dark-lighter rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Play className="h-4 w-4 mr-2 text-green-500" />
                          Oyunlar
                        </div>
                        <span className="text-light-muted">12%</span>
                      </div>
                      <div className="w-full bg-dark-lighter rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-surface border-dark-lighter">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                    Son Aktiviteler
                  </CardTitle>
                  <CardDescription>En son gerçekleşen işlemler</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-dark-lighter pb-3">
                      <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Ahmet Y. tarafından yeni sohbet başlatıldı</p>
                        <p className="text-xs text-light-muted">10 dakika önce</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 border-b border-dark-lighter pb-3">
                      <div className="h-8 w-8 bg-secondary/20 rounded-full flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Zeynep K. tarafından yeni görsel oluşturuldu</p>
                        <p className="text-xs text-light-muted">25 dakika önce</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 border-b border-dark-lighter pb-3">
                      <div className="h-8 w-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <UserCircle className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Mehmet A. yeni üye oldu</p>
                        <p className="text-xs text-light-muted">1 saat önce</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 border-b border-dark-lighter pb-3">
                      <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Coins className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Pınar Ş. günlük puan bonusunu aldı</p>
                        <p className="text-xs text-light-muted">2 saat önce</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Code className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Caner T. tarafından kod üretildi</p>
                        <p className="text-xs text-light-muted">3 saat önce</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-surface border-dark-lighter">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ScrollText className="h-5 w-5 mr-2 text-secondary" />
                    Sistem Durumu
                  </CardTitle>
                  <CardDescription>API ve hizmetlerin durum bilgisi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b border-dark-lighter pb-3">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>OpenAI API</span>
                    </div>
                    <span className="text-green-500 text-sm">Aktif</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-dark-lighter pb-3">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Hugging Face API</span>
                    </div>
                    <span className="text-green-500 text-sm">Aktif</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-dark-lighter pb-3">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>DeepSeek API</span>
                    </div>
                    <span className="text-green-500 text-sm">Aktif</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-dark-lighter pb-3">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Gemini API</span>
                    </div>
                    <span className="text-green-500 text-sm">Aktif</span>
                  </div>
                  
                  <div className="flex items-center justify-between border-b border-dark-lighter pb-3">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Groq API</span>
                    </div>
                    <span className="text-green-500 text-sm">Aktif</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Veritabanı</span>
                    </div>
                    <span className="text-green-500 text-sm">Aktif</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Models Tab */}
          <TabsContent value="ai-models">
            <Card className="bg-dark-surface border-dark-lighter">
              <CardHeader>
                <CardTitle>AI Modelleri</CardTitle>
                <CardDescription>Kullanılabilir AI modellerini yönetin</CardDescription>
              </CardHeader>
              <CardContent>
                {aiModels && aiModels.length > 0 ? (
                  <div className="rounded-md border border-dark-lighter">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                          <TableHead>Model ID</TableHead>
                          <TableHead>Model Adı</TableHead>
                          <TableHead>Açıklama</TableHead>
                          <TableHead className="text-center">Puan Maliyeti</TableHead>
                          <TableHead className="text-center">Yetenekler</TableHead>
                          <TableHead className="text-right">Durum</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {aiModels.map((model: any) => (
                          <TableRow key={model.id} className="hover:bg-dark-lighter border-dark-lighter">
                            <TableCell>{model.id}</TableCell>
                            <TableCell className="font-medium">{model.name}</TableCell>
                            <TableCell>
                              <div className="max-w-xs truncate">{model.description}</div>
                            </TableCell>
                            <TableCell className="text-center">{model.pointCost}</TableCell>
                            <TableCell>
                              <div className="flex justify-center gap-2">
                                {model.supportsChat && (
                                  <div className="bg-primary/20 rounded-full p-1" title="Sohbet">
                                    <MessageSquare className="h-3 w-3 text-primary" />
                                  </div>
                                )}
                                {model.supportsImage && (
                                  <div className="bg-secondary/20 rounded-full p-1" title="Görsel">
                                    <ImageIcon className="h-3 w-3 text-secondary" />
                                  </div>
                                )}
                                {model.supportsCode && (
                                  <div className="bg-accent/20 rounded-full p-1" title="Kod">
                                    <Code className="h-3 w-3 text-accent" />
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-green-500">Aktif</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-dark-lighter rounded-md">
                    <Bot className="h-12 w-12 mx-auto text-light-muted mb-2" />
                    <p>Henüz AI modeli bulunmuyor.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* API Keys Tab */}
          <TabsContent value="api-keys">
            <Card className="bg-dark-surface border-dark-lighter">
              <CardHeader>
                <CardTitle>API Anahtarları</CardTitle>
                <CardDescription>Sistem tarafından kullanılan API anahtarlarını yönetin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-dark-lighter rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                          <KeyRound className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">OpenAI API</h3>
                          <p className="text-light-muted text-sm">OpenAI platformuna erişim anahtarı</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" className="border-dark-lighter text-light">
                          Güncelle
                        </Button>
                      </div>
                    </div>
                    <div className="bg-dark-surface p-3 rounded-md flex items-center gap-2">
                      <code className="flex-1 text-primary">••••••••••••••••••••••••••••••••</code>
                      <Button variant="ghost" size="sm">
                        Göster
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-dark-lighter rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-secondary/20 rounded-full flex items-center justify-center mr-3">
                          <KeyRound className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Hugging Face API</h3>
                          <p className="text-light-muted text-sm">Hugging Face platformuna erişim anahtarı</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" className="border-dark-lighter text-light">
                          Güncelle
                        </Button>
                      </div>
                    </div>
                    <div className="bg-dark-surface p-3 rounded-md flex items-center gap-2">
                      <code className="flex-1 text-secondary">••••••••••••••••••••••••••••••••</code>
                      <Button variant="ghost" size="sm">
                        Göster
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-dark-lighter rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                          <KeyRound className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold">DeepSeek API</h3>
                          <p className="text-light-muted text-sm">DeepSeek platformuna erişim anahtarı</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" className="border-dark-lighter text-light">
                          Güncelle
                        </Button>
                      </div>
                    </div>
                    <div className="bg-dark-surface p-3 rounded-md flex items-center gap-2">
                      <code className="flex-1 text-accent">••••••••••••••••••••••••••••••••</code>
                      <Button variant="ghost" size="sm">
                        Göster
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-dark-lighter rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                          <KeyRound className="h-4 w-4 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Gemini API</h3>
                          <p className="text-light-muted text-sm">Gemini platformuna erişim anahtarı</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" className="border-dark-lighter text-light">
                          Güncelle
                        </Button>
                      </div>
                    </div>
                    <div className="bg-dark-surface p-3 rounded-md flex items-center gap-2">
                      <code className="flex-1 text-green-500">••••••••••••••••••••••••••••••••</code>
                      <Button variant="ghost" size="sm">
                        Göster
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-dark-lighter rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                          <KeyRound className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Groq API</h3>
                          <p className="text-light-muted text-sm">Groq platformuna erişim anahtarı</p>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" className="border-dark-lighter text-light">
                          Güncelle
                        </Button>
                      </div>
                    </div>
                    <div className="bg-dark-surface p-3 rounded-md flex items-center gap-2">
                      <code className="flex-1 text-purple-500">••••••••••••••••••••••••••••••••</code>
                      <Button variant="ghost" size="sm">
                        Göster
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="bg-dark-surface border-dark-lighter">
              <CardHeader>
                <CardTitle>Görünüm Ayarları</CardTitle>
                <CardDescription>Platformun görsel temasını özelleştirin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Palette className="h-5 w-5 mr-2 text-primary" />
                      Renk Şeması
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border border-primary rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition">
                        <div className="flex justify-center mb-3">
                          <div className="h-12 w-12 rounded-full bg-primary"></div>
                        </div>
                        <div className="text-center">Turkuaz</div>
                      </div>
                      
                      <div className="border border-dark-lighter rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition">
                        <div className="flex justify-center mb-3">
                          <div className="h-12 w-12 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="text-center">Mavi</div>
                      </div>
                      
                      <div className="border border-dark-lighter rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition">
                        <div className="flex justify-center mb-3">
                          <div className="h-12 w-12 rounded-full bg-purple-500"></div>
                        </div>
                        <div className="text-center">Mor</div>
                      </div>
                      
                      <div className="border border-dark-lighter rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition">
                        <div className="flex justify-center mb-3">
                          <div className="h-12 w-12 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-center">Yeşil</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-dark-lighter pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-secondary" />
                      Renk Modu
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-dark-lighter rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition flex flex-col items-center">
                        <div className="h-24 w-3/4 rounded-md bg-dark-surface border border-dark-lighter mb-3 flex flex-col items-center justify-center">
                          <div className="w-2/3 h-2 bg-dark-lighter rounded-full mb-2"></div>
                          <div className="w-1/2 h-2 bg-dark-lighter rounded-full"></div>
                        </div>
                        <div className="text-center">Koyu Tema</div>
                      </div>
                      
                      <div className="border border-dark-lighter rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition flex flex-col items-center">
                        <div className="h-24 w-3/4 rounded-md bg-gray-200 border border-gray-300 mb-3 flex flex-col items-center justify-center">
                          <div className="w-2/3 h-2 bg-gray-400 rounded-full mb-2"></div>
                          <div className="w-1/2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="text-center">Açık Tema</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-dark-lighter pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-accent" />
                      Yazı Tipi Boyutu
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border border-dark-lighter rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition">
                        <div className="text-center text-sm">Küçük</div>
                      </div>
                      
                      <div className="border border-primary rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition">
                        <div className="text-center">Normal</div>
                      </div>
                      
                      <div className="border border-dark-lighter rounded-md p-4 cursor-pointer bg-dark-lighter hover:bg-dark-lighter/80 transition">
                        <div className="text-center text-lg">Büyük</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Ayarları Kaydet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Content Management Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-dark-surface border-dark-lighter">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layout className="h-5 w-5 mr-2 text-primary" />
                    Sayfa İçeriği Yönetimi
                  </CardTitle>
                  <CardDescription>Web sitesi içeriklerini düzenleyin</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="header">
                    <TabsList className="bg-dark-lighter rounded-sm mb-6">
                      <TabsTrigger value="header" className="rounded-sm data-[state=active]:bg-primary/20">
                        <Menu className="h-4 w-4 mr-2" />
                        Header
                      </TabsTrigger>
                      <TabsTrigger value="hero" className="rounded-sm data-[state=active]:bg-primary/20">
                        <Home className="h-4 w-4 mr-2" />
                        Hero
                      </TabsTrigger>
                      <TabsTrigger value="features" className="rounded-sm data-[state=active]:bg-primary/20">
                        <Layers className="h-4 w-4 mr-2" />
                        Özellikler
                      </TabsTrigger>
                      <TabsTrigger value="footer" className="rounded-sm data-[state=active]:bg-primary/20">
                        <Globe className="h-4 w-4 mr-2" />
                        Footer
                      </TabsTrigger>
                    </TabsList>

                    {/* Header Section */}
                    <TabsContent value="header">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 border-b border-dark-lighter pb-6">
                          <h3 className="text-lg font-semibold mb-2">Logo ve Site Başlığı</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="site-title">Site Başlığı</Label>
                              <Input id="site-title" value="ZekiBot" className="bg-dark-lighter mt-2" />
                            </div>
                            <div>
                              <Label htmlFor="logo-upload">Logo</Label>
                              <div className="flex items-center mt-2">
                                <div className="h-10 w-10 bg-primary rounded mr-3 flex items-center justify-center text-white font-bold">Z</div>
                                <Button variant="outline" size="sm" className="mr-2">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Yükle
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold mb-2">Menü Öğeleri</h3>
                          <div className="rounded-md border border-dark-lighter">
                            <Table>
                              <TableHeader>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableHead className="w-[50px]">Sıra</TableHead>
                                  <TableHead>Başlık</TableHead>
                                  <TableHead>Bağlantı</TableHead>
                                  <TableHead className="text-center">Aktif</TableHead>
                                  <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableCell>1</TableCell>
                                  <TableCell>Ana Sayfa</TableCell>
                                  <TableCell>/</TableCell>
                                  <TableCell className="text-center">
                                    <Switch checked={true} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableCell>2</TableCell>
                                  <TableCell>Sohbet</TableCell>
                                  <TableCell>/chat</TableCell>
                                  <TableCell className="text-center">
                                    <Switch checked={true} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableCell>3</TableCell>
                                  <TableCell>Görsel Oluşturma</TableCell>
                                  <TableCell>/image-generator</TableCell>
                                  <TableCell className="text-center">
                                    <Switch checked={true} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          <Button className="mt-2">
                            <Plus className="h-4 w-4 mr-2" />
                            Yeni Menü Öğesi Ekle
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Hero Section */}
                    <TabsContent value="hero">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="hero-title">Ana Başlık</Label>
                            <Input id="hero-title" value="Yapay Zeka ile Hayatınızı Kolaylaştırın" className="bg-dark-lighter mt-2" />
                          </div>
                          
                          <div>
                            <Label htmlFor="hero-subtitle">Alt Başlık</Label>
                            <Textarea id="hero-subtitle" value="ZekiBot ile sohbet edin, görsel oluşturun, kod yazın ve daha fazlasını yapın." className="bg-dark-lighter mt-2 min-h-[100px]" />
                          </div>
                          
                          <div>
                            <Label htmlFor="hero-cta-text">Buton Metni</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <Input id="hero-cta-text" value="Hemen Başla" className="bg-dark-lighter" />
                              <Input id="hero-cta-link" value="/register" placeholder="Bağlantı" className="bg-dark-lighter" />
                            </div>
                          </div>
                          
                          <div>
                            <Label>Arka Plan Görseli</Label>
                            <div className="mt-2 p-4 border border-dashed border-dark-lighter rounded-md bg-dark-surface">
                              <div className="flex flex-col items-center">
                                <div className="bg-dark-lighter rounded-md h-32 w-full mb-4 flex items-center justify-center">
                                  <ImageIcon className="h-12 w-12 text-light-muted" />
                                </div>
                                <div className="flex space-x-3">
                                  <Button variant="outline" size="sm">
                                    <Upload className="h-4 w-4 mr-2" />
                                    Görsel Yükle
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-400">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Kaldır
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Save className="h-4 w-4 mr-2" />
                            Değişiklikleri Kaydet
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Features Section */}
                    <TabsContent value="features">
                      <div className="space-y-6">
                        <div className="mb-4">
                          <Label htmlFor="features-title">Bölüm Başlığı</Label>
                          <Input id="features-title" value="Özelliklerimiz" className="bg-dark-lighter mt-2" />
                        </div>
                        
                        <div className="mb-4">
                          <Label htmlFor="features-description">Bölüm Açıklaması</Label>
                          <Textarea id="features-description" value="ZekiBot'un sunduğu çeşitli yapay zeka özellikleri ile tanışın." className="bg-dark-lighter mt-2 min-h-[80px]" />
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Özellik Kartları</h3>
                          <div className="space-y-4">
                            <div className="rounded-md border border-dark-lighter p-4">
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="md:w-1/4">
                                  <div className="h-16 w-16 rounded-md bg-primary/20 flex items-center justify-center mb-2">
                                    <MessageSquare className="h-8 w-8 text-primary" />
                                  </div>
                                </div>
                                <div className="md:w-3/4 space-y-3">
                                  <div>
                                    <Label htmlFor="feature-1-title">Başlık</Label>
                                    <Input id="feature-1-title" value="Yapay Zeka Sohbet" className="bg-dark-lighter mt-1" />
                                  </div>
                                  <div>
                                    <Label htmlFor="feature-1-desc">Açıklama</Label>
                                    <Textarea id="feature-1-desc" value="Gelişmiş yapay zeka modellerimiz ile sohbet edin, sorular sorun, bilgi alın." className="bg-dark-lighter mt-1" />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Label htmlFor="feature-1-active" className="cursor-pointer">Aktif</Label>
                                      <Switch id="feature-1-active" checked={true} />
                                    </div>
                                    <div>
                                      <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Sil
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="rounded-md border border-dark-lighter p-4">
                              <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="md:w-1/4">
                                  <div className="h-16 w-16 rounded-md bg-secondary/20 flex items-center justify-center mb-2">
                                    <ImageIcon className="h-8 w-8 text-secondary" />
                                  </div>
                                </div>
                                <div className="md:w-3/4 space-y-3">
                                  <div>
                                    <Label htmlFor="feature-2-title">Başlık</Label>
                                    <Input id="feature-2-title" value="Görsel Oluşturma" className="bg-dark-lighter mt-1" />
                                  </div>
                                  <div>
                                    <Label htmlFor="feature-2-desc">Açıklama</Label>
                                    <Textarea id="feature-2-desc" value="Hayal ettiğiniz görselleri metinle tanımlayın, yapay zeka sizin için oluştursun." className="bg-dark-lighter mt-1" />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Label htmlFor="feature-2-active" className="cursor-pointer">Aktif</Label>
                                      <Switch id="feature-2-active" checked={true} />
                                    </div>
                                    <div>
                                      <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Sil
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Button className="w-full border border-dashed border-primary text-primary hover:bg-primary/10">
                              <Plus className="h-4 w-4 mr-2" />
                              Yeni Özellik Ekle
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Save className="h-4 w-4 mr-2" />
                            Değişiklikleri Kaydet
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Footer Section */}
                    <TabsContent value="footer">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="footer-title">Footer Başlığı</Label>
                            <Input id="footer-title" value="ZekiBot" className="bg-dark-lighter mt-2" />
                          </div>
                          
                          <div>
                            <Label htmlFor="footer-description">Footer Açıklaması</Label>
                            <Textarea id="footer-description" value="Yapay zeka destekli çözümler ile geleceği şekillendiriyoruz." className="bg-dark-lighter mt-2 min-h-[80px]" />
                          </div>
                          
                          <div>
                            <Label htmlFor="copyright-text">Telif Hakkı Metni</Label>
                            <Input id="copyright-text" value="© 2024 ZekiBot. Tüm hakları saklıdır." className="bg-dark-lighter mt-2" />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Footer Bağlantıları</h3>
                          <div className="rounded-md border border-dark-lighter">
                            <Table>
                              <TableHeader>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableHead className="w-[50px]">Sıra</TableHead>
                                  <TableHead>Başlık</TableHead>
                                  <TableHead>Bağlantı</TableHead>
                                  <TableHead className="text-center">Aktif</TableHead>
                                  <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableCell>1</TableCell>
                                  <TableCell>Hakkımızda</TableCell>
                                  <TableCell>/about</TableCell>
                                  <TableCell className="text-center">
                                    <Switch checked={true} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableCell>2</TableCell>
                                  <TableCell>Gizlilik Politikası</TableCell>
                                  <TableCell>/privacy</TableCell>
                                  <TableCell className="text-center">
                                    <Switch checked={true} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-dark-lighter border-dark-lighter">
                                  <TableCell>3</TableCell>
                                  <TableCell>İletişim</TableCell>
                                  <TableCell>/contact</TableCell>
                                  <TableCell className="text-center">
                                    <Switch checked={true} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          <Button className="mt-2">
                            <Plus className="h-4 w-4 mr-2" />
                            Yeni Bağlantı Ekle
                          </Button>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Save className="h-4 w-4 mr-2" />
                            Değişiklikleri Kaydet
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-surface border-dark-lighter">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2 text-secondary" />
                    Medya Yönetimi
                  </CardTitle>
                  <CardDescription>Görseller ve medya dosyalarını yönetin</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Yüklenen Görseller</h3>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Yeni Görsel Yükle
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="rounded-md border border-dark-lighter bg-dark-lighter p-2 space-y-2">
                        <div className="aspect-square bg-dark-surface rounded-md flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-light-muted" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate">logo.png</span>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-md border border-dark-lighter bg-dark-lighter p-2 space-y-2">
                        <div className="aspect-square bg-dark-surface rounded-md flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-light-muted" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate">hero-bg.jpg</span>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-md border border-dark-lighter bg-dark-lighter p-2 space-y-2">
                        <div className="aspect-square bg-dark-surface rounded-md flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-light-muted" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate">feature-1.svg</span>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-md border border-dark-lighter bg-dark-lighter p-2 space-y-2">
                        <div className="aspect-square bg-dark-surface rounded-md flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-light-muted" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm truncate">feature-2.svg</span>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Points Dialog */}
      <Dialog open={isAddPointsDialogOpen} onOpenChange={setIsAddPointsDialogOpen}>
        <DialogContent className="bg-dark-surface border-dark-lighter">
          <DialogHeader>
            <DialogTitle>Puan Ekle</DialogTitle>
            <DialogDescription>
              {selectedUser && (
                <div className="flex items-center mt-2">
                  <UserCircle className="h-5 w-5 mr-2 text-primary" />
                  <span>{selectedUser.username} ({selectedUser.email})</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miktar</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-dark-lighter border-dark-lighter text-light"
                        placeholder="Eklenecek puan miktarı"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-dark-lighter border-dark-lighter text-light"
                        placeholder="Puan ekleme nedeni"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddPointsDialogOpen(false)}
                  className="border-dark-lighter text-light"
                >
                  İptal
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90"
                  disabled={isAddingPoints}
                >
                  {isAddingPoints ? 'Ekleniyor...' : 'Puan Ekle'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Admin;
