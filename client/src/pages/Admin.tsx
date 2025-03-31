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
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet";
import { Shield, Users, Coins, Plus, UserCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>

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
