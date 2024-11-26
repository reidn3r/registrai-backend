import { createClient } from "@supabase/supabase-js";

export class AuthProvider {
    private supabase;
    private supabase_url:string;
    private supabase_key:string;

    constructor(){
        this.supabase_url = process.env.SUPABASE_URL as string;
        this.supabase_key = process.env.SUPABASE_KEY as string;
        this.supabase = createClient(this.supabase_url, this.supabase_key);
    }

    public async emailVerifyAndLogin(token:string){
        // return { data, error }
        return await this.supabase.auth.verifyOtp({ type: 'email', token_hash: token });
    }
    
    public async signupUser(email:string, password:string){
        return await this.supabase.auth.signUp({
            email,
            password
        })
    }
}