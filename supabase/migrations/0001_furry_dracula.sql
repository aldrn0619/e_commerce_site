CREATE TABLE public.users (
  id uuid PRIMARY KEY NOT NULL,
  display_name text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE public.users
ADD CONSTRAINT users_id_auth_users_id_fk
FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
--> statement-breakpoint
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;
--> statement-breakpoint
CREATE POLICY "Users can view their own record"
ON public.users FOR SELECT TO authenticated
USING ((select auth.uid()) = id);
--> statement-breakpoint
CREATE POLICY "Users can create their own record"
ON public.users FOR INSERT TO authenticated
WITH CHECK ((select auth.uid()) = id);
--> statement-breakpoint
CREATE POLICY "Users can update their own record"
ON public.users FOR UPDATE TO authenticated
USING ((select auth.uid()) = id)
WITH CHECK ((select auth.uid()) = id);