import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertConfiguration, type Configuration } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useConfigurations() {
  return useQuery({
    queryKey: [api.configurations.list.path],
    queryFn: async () => {
      const res = await fetch(api.configurations.list.path);
      if (!res.ok) throw new Error("Failed to fetch configurations");
      return api.configurations.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateConfiguration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertConfiguration) => {
      const res = await fetch(api.configurations.create.path, {
        method: api.configurations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create configuration");
      }
      
      return api.configurations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.configurations.list.path] });
      toast({
        title: "Configuration Saved",
        description: "Your ad settings have been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteConfiguration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.configurations.delete.path, { id });
      const res = await fetch(url, { method: api.configurations.delete.method });
      
      if (!res.ok) {
        throw new Error("Failed to delete configuration");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.configurations.list.path] });
      toast({
        title: "Deleted",
        description: "Configuration has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
