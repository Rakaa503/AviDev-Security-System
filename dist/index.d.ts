import cors from 'cors';
import { z, ZodType } from 'zod';
import * as _prisma_client_runtime_library from '@prisma/client/runtime/library';
import * as _prisma_client from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import * as better_auth from 'better-auth';

declare const corsMiddleware: (req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;

declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    DATABASE_URL: z.ZodString;
    BETTER_AUTH_SECRET: z.ZodString;
    BETTER_AUTH_URL: z.ZodString;
}, z.core.$strip>;
type Env = z.infer<typeof envSchema>;
declare function validateEnv(): Env;

declare global {
    var prisma: PrismaClient | undefined;
}
declare const prisma: PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client_runtime_library.DefaultArgs>;

interface ValidationResult<T> {
    success: boolean;
    data?: T;
    errors?: string[];
}
declare function validate<T>(schema: ZodType<T>, input: unknown): ValidationResult<T>;
declare function validateOrThrow<T>(schema: ZodType<T>, input: unknown): T;

interface AVSSPlugin {
    name: string;
    setup(): void;
}

declare function loggerPlugin(): AVSSPlugin;

declare function auditPlugin(): AVSSPlugin;

interface AuthConfig {
    /**
     * Prisma Client
     */
    prisma: PrismaClient;
    /**
     * Optional plugins
     */
    plugins?: AVSSPlugin[];
}
/**
 * Simpan konfigurasi auth
 */
declare function setConfig(config: AuthConfig): void;
/**
 * Ambil konfigurasi auth
 */
declare function getConfig(): AuthConfig;

declare function createAuth(config: AuthConfig): better_auth.Auth<{
    database: (options: better_auth.BetterAuthOptions) => better_auth.DBAdapter<better_auth.BetterAuthOptions>;
}>;

/**
 * Hash a plain text password using Argon2id.
 */
declare function hashPassword(password: string): Promise<string>;
/**
 * Verify a password against a stored hash.
 */
declare function verifyPassword(password: string, hash: string): Promise<boolean>;
/**
 * Check if a password hash should be rehashed.
 */
declare function needsRehash(hash: string): Promise<boolean>;
/**
 * Generate a secure random password.
 */
declare function generatePassword(length?: number): string;

declare enum Role {
    USER = "USER",
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}
declare const DEFAULT_ROLE = Role.USER;
declare function hasRole(userRole: Role, requiredRole: Role): boolean;
declare function hasAnyRole(userRole: Role, roles: Role[]): boolean;
declare function isUser(role: Role): boolean;
declare function isModerator(role: Role): boolean;
declare function isAdmin(role: Role): boolean;
declare function isSuperAdmin(role: Role): boolean;

interface AuthAdapter {
    prisma: PrismaClient;
}
declare function createAdapter(prisma: PrismaClient): AuthAdapter;

interface SessionUser {
    id: string;
    email: string;
    name?: string;
    role?: string;
}
interface Session {
    user: SessionUser;
    expiresAt: Date;
}
declare function isSessionExpired(session: Session): boolean;
declare function getRemainingTime(session: Session): number;

interface MiddlewareUser {
    id: string;
    role: Role;
}
interface MiddlewareResult {
    success: boolean;
    message: string;
}
declare function authMiddleware(user: MiddlewareUser | null): MiddlewareResult;
declare function roleMiddleware(user: MiddlewareUser | null, roles: Role[]): MiddlewareResult;
declare function guestMiddleware(user: MiddlewareUser | null): MiddlewareResult;

interface GoogleProviderConfig {
    clientId: string;
    clientSecret: string;
}
interface GoogleProvider {
    id: "google";
    name: "Google";
    config: GoogleProviderConfig;
}
declare function createGoogleProvider(config: GoogleProviderConfig): GoogleProvider;

interface GithubProviderConfig {
    clientId: string;
    clientSecret: string;
}
interface GithubProvider {
    id: "github";
    name: "GitHub";
    config: GithubProviderConfig;
}
declare function createGithubProvider(config: GithubProviderConfig): GithubProvider;

interface DiscordProviderConfig {
    clientId: string;
    clientSecret: string;
}
interface DiscordProvider {
    id: "discord";
    name: "Discord";
    config: DiscordProviderConfig;
}
declare function createDiscordProvider(config: DiscordProviderConfig): DiscordProvider;

interface MicrosoftProviderConfig {
    clientId: string;
    clientSecret: string;
}
interface MicrosoftProvider {
    id: "microsoft";
    name: "Microsoft";
    config: MicrosoftProviderConfig;
}
declare function createMicrosoftProvider(config: MicrosoftProviderConfig): MicrosoftProvider;

interface AppleProviderConfig {
    clientId: string;
    clientSecret: string;
}
interface AppleProvider {
    id: "apple";
    name: "Apple";
    config: AppleProviderConfig;
}
declare function createAppleProvider(config: AppleProviderConfig): AppleProvider;

interface GitlabProviderConfig {
    clientId: string;
    clientSecret: string;
}
interface GitlabProvider {
    id: "gitlab";
    name: "GitLab";
    config: GitlabProviderConfig;
}
declare function createGitlabProvider(config: GitlabProviderConfig): GitlabProvider;

interface CredentialsProviderConfig {
    emailVerification?: boolean;
    passwordReset?: boolean;
}
interface CredentialsProvider {
    id: "credentials";
    name: "Credentials";
    config: CredentialsProviderConfig;
}
declare function createCredentialsProvider(config?: CredentialsProviderConfig): CredentialsProvider;

interface AuthProvider {
    id: string;
    name: string;
}
declare class ProviderManager {
    private readonly providers;
    register<T extends AuthProvider>(provider: T): T;
    get(id: string): AuthProvider | undefined;
    has(id: string): boolean;
    all(): AuthProvider[];
    count(): number;
    clear(): void;
}
declare const providerManager: ProviderManager;

interface OAuthProviderConfig {
    clientId: string;
    clientSecret: string;
}
interface BaseProvider {
    id: string;
    name: string;
}

declare const PROVIDER_VERSION = "1.0.0";
declare const PROVIDERS: {
    readonly GOOGLE: "google";
    readonly GITHUB: "github";
    readonly DISCORD: "discord";
    readonly MICROSOFT: "microsoft";
    readonly APPLE: "apple";
    readonly GITLAB: "gitlab";
    readonly CREDENTIALS: "credentials";
};

declare const PROVIDERS_FRAMEWORK = "AVSS Providers";
declare const PROVIDERS_VERSION = "v1.0.0";

interface AuditUser {
    id: string;
    name: string;
    email?: string;
    role?: string;
}
interface AuditEntry {
    event: string;
    user?: AuditUser;
    message?: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
    timestamp: Date;
}
interface AuditOptions {
    enabled?: boolean;
    showTimestamp?: boolean;
    showUserAgent?: boolean;
    showIp?: boolean;
}

declare class Audit {
    log(entry: AuditEntry): void;
    login(user: AuditUser): void;
    logout(user: AuditUser): void;
    register(user: AuditUser): void;
    failedLogin(email: string): void;
    changePassword(user: AuditUser): void;
    changeRole(user: AuditUser, oldRole: string, newRole: string): void;
    createUser(user: AuditUser): void;
    updateUser(user: AuditUser): void;
    deleteUser(user: AuditUser): void;
    verifyEmail(user: AuditUser): void;
    resetPassword(user: AuditUser): void;
}
declare const audit: Audit;

declare enum AuditEvent {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",
    FAILED_LOGIN = "FAILED_LOGIN",
    CHANGE_PASSWORD = "CHANGE_PASSWORD",
    CHANGE_ROLE = "CHANGE_ROLE",
    CREATE_USER = "CREATE_USER",
    UPDATE_USER = "UPDATE_USER",
    DELETE_USER = "DELETE_USER",
    VERIFY_EMAIL = "VERIFY_EMAIL",
    RESET_PASSWORD = "RESET_PASSWORD"
}

declare function formatAudit(entry: AuditEntry): string;

interface CheckResult {
    name: string;
    success: boolean;
}
declare class Doctor {
    private results;
    check(name: string, success: boolean): void;
    render(): void;
}
declare const doctor: Doctor;

declare enum ErrorCode {
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    SESSION_EXPIRED = "SESSION_EXPIRED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
}

declare class AVSSError extends Error {
    readonly status: number;
    readonly code: ErrorCode;
    readonly timestamp: Date;
    constructor(message: string, status: number, code: ErrorCode);
    toJSON(): {
        name: string;
        message: string;
        status: number;
        code: ErrorCode;
        timestamp: string;
    };
}

declare class UnauthorizedError extends AVSSError {
    constructor(message?: string);
}

declare class ForbiddenError extends AVSSError {
    constructor(message?: string);
}

declare class ValidationError extends AVSSError {
    constructor(message?: string);
}

declare class SessionExpiredError extends AVSSError {
    constructor(message?: string);
}

declare class InternalServerError extends AVSSError {
    constructor(message?: string);
}

interface ErrorResponse {
    success: false;
    error: {
        name: string;
        message: string;
        status: number;
        code: string;
        timestamp: string;
    };
}
declare function errorHandler(error: unknown): ErrorResponse;

interface LoginEvent {
    id: string;
    name: string;
    email?: string;
    role?: string;
}
interface LogoutEvent {
    id: string;
    name: string;
}
interface RegisterEvent {
    id: string;
    name: string;
    email?: string;
}
interface FailedLoginEvent {
    email: string;
}
interface EventMap {
    login: LoginEvent;
    logout: LogoutEvent;
    register: RegisterEvent;
    failedLogin: FailedLoginEvent;
    changePassword: LoginEvent;
    changeRole: LoginEvent;
    deleteUser: LoginEvent;
    verifyEmail: LoginEvent;
    resetPassword: LoginEvent;
}
type EventName = keyof EventMap;

type EventListener<K extends keyof EventMap> = (payload: EventMap[K]) => void;

declare class EventEmitter {
    private listeners;
    on<K extends EventName>(event: K, listener: EventListener<K>): void;
    off<K extends EventName>(event: K, listener: EventListener<K>): void;
    emit<K extends EventName>(event: K, payload: EventMap[K]): void;
    clear(): void;
    listenerCount(event: EventName): number;
}
declare const events: EventEmitter;

declare class Logger {
    private log;
    info(message: string): void;
    success(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    security(message: string): void;
    database(message: string): void;
    access(message: string): void;
    fatal(message: string): void;
}
declare const logger: Logger;

declare function startTimer(name: string): void;
declare function endTimer(name: string): void;

interface RequestLog {
    method: string;
    url: string;
    status: number;
    ip?: string;
}
declare function logRequest(req: RequestLog): void;

declare function showBanner(): void;

declare function rotateLogs(): void;

interface CsrfConfig {
    /**
     * Header yang digunakan untuk mengirim CSRF token.
     */
    headerName: string;
    /**
     * Panjang token yang dihasilkan.
     */
    tokenLength: number;
    /**
     * Mengaktifkan validasi CSRF.
     */
    enabled: boolean;
}
declare const defaultCsrfConfig: Readonly<CsrfConfig>;

declare function generateCsrfToken(config?: CsrfConfig): string;
declare function validateCsrfToken(token: string, expected: string): boolean;

interface CsrfRequest {
    headers: Record<string, string | undefined>;
    csrfToken: string;
}
interface CsrfResult {
    success: boolean;
    message: string;
}
declare function csrfMiddleware(request: CsrfRequest, config?: CsrfConfig): CsrfResult;

interface XssConfig {
    enabled: boolean;
    escapeHtml: boolean;
    trimInput: boolean;
}
declare const defaultXssConfig: Readonly<XssConfig>;

declare function escapeHtml(value: string): string;

declare function sanitize(input: string, config?: XssConfig): string;

interface HeaderConfig {
    contentSecurityPolicy: boolean;
    strictTransportSecurity: boolean;
    frameOptions: boolean;
    contentTypeOptions: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
}
declare const defaultHeaderConfig: Readonly<HeaderConfig>;

declare class SecurityHeadersBuilder {
    private readonly headers;
    static create(): SecurityHeadersBuilder;
    withDefaults(config?: HeaderConfig): SecurityHeadersBuilder;
    add(name: string, value: string): SecurityHeadersBuilder;
    remove(name: string): SecurityHeadersBuilder;
    build(): Readonly<Record<string, string>>;
}

declare const DEFAULT_SECURITY_HEADERS: {
    readonly "Content-Security-Policy": "default-src 'self'; object-src 'none'; frame-ancestors 'none';";
    readonly "Strict-Transport-Security": "max-age=31536000; includeSubDomains";
    readonly "X-Frame-Options": "DENY";
    readonly "X-Content-Type-Options": "nosniff";
    readonly "Referrer-Policy": "strict-origin-when-cross-origin";
    readonly "Permissions-Policy": "camera=(), microphone=(), geolocation=()";
};

interface CorsConfig {
    enabled: boolean;
    origin: string | string[];
    methods: string[];
    headers: string[];
    credentials: boolean;
    maxAge: number;
}
declare const defaultCorsConfig: Readonly<CorsConfig>;

interface CorsHeaders {
    [key: string]: string;
}
declare function createCorsHeaders(config?: CorsConfig): Readonly<CorsHeaders>;

interface CookieConfig {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    path: string;
    maxAge: number;
}
declare const defaultCookieConfig: Readonly<CookieConfig>;

type CookieMap = Record<string, string>;
declare function parseCookies(cookieHeader: string): CookieMap;
declare function serializeCookie(name: string, value: string, config?: CookieConfig): string;

interface ProxyConfig {
    enabled: boolean;
    trustedProxies: string[];
    trustForwardedHost: boolean;
    trustForwardedProto: boolean;
}
declare const defaultProxyConfig: Readonly<ProxyConfig>;

interface ProxyHeaders {
    "x-forwarded-for"?: string;
    "x-forwarded-host"?: string;
    "x-forwarded-proto"?: string;
}
interface ProxyInfo {
    clientIp: string;
    host?: string;
    protocol?: string;
}
declare function getProxyInfo(headers: ProxyHeaders, config?: ProxyConfig): ProxyInfo;
declare function isTrustedProxy(ip: string, config?: ProxyConfig): boolean;

interface RateLimitConfig {
    enabled: boolean;
    windowMs: number;
    maxRequests: number;
}
declare const defaultRateLimitConfig: Readonly<RateLimitConfig>;

interface RateLimitEntry {
    count: number;
    resetAt: number;
}
interface RateLimiterOptions {
    limit: number;
    windowMs: number;
}
interface RateLimitResult$1 {
    allowed: boolean;
    remaining: number;
    reset: number;
}
declare class MemoryStore {
    private readonly store;
    get(key: string): RateLimitEntry | undefined;
    set(key: string, value: RateLimitEntry): void;
    delete(key: string): void;
    clear(): void;
    keys(): string[];
    size(): number;
}
declare class RateLimiter {
    private readonly options;
    private readonly store;
    constructor(options: RateLimiterOptions);
    consume(key: string): RateLimitResult$1;
    stats(): {
        keys: number;
        limit: number;
        windowMs: number;
    };
    keys(): string[];
    clear(): void;
}

interface RateLimitResult {
    success: boolean;
    remaining: number;
    retryAfter: number;
}
declare function rateLimit(key: string, config?: RateLimitConfig): RateLimitResult;

interface SecurityConfig {
    csrf?: Partial<CsrfConfig>;
    xss?: Partial<XssConfig>;
    headers?: Partial<HeaderConfig>;
    cors?: Partial<CorsConfig>;
    cookies?: Partial<CookieConfig>;
    proxy?: Partial<ProxyConfig>;
    rateLimit?: Partial<RateLimitConfig>;
}
interface SecurityModule {
    readonly name: string;
    readonly version: string;
}
interface SecurityResult {
    success: boolean;
    message: string;
}
interface ClientInfo {
    ip: string;
    host?: string;
    protocol?: string;
}
interface SecurityHeaders {
    [key: string]: string;
}

declare function setSecurityConfig(value: SecurityConfig): void;
declare function getSecurityConfig(): Readonly<SecurityConfig>;
declare function resetSecurityConfig(): void;

/**
 * AVSS Lite Security Framework
 */
declare const SECURITY_NAME = "AVSS Security";
declare const SECURITY_VERSION = "1.0.0-alpha";
declare const DEFAULT_TOKEN_LENGTH = 64;
declare const DEFAULT_RATE_LIMIT = 100;
declare const DEFAULT_RATE_WINDOW = 60000;
declare const DEFAULT_COOKIE_NAME = "avss.session";
declare const DEFAULT_CSRF_HEADER = "X-CSRF-Token";
declare const DEFAULT_CSRF_COOKIE = "avss.csrf";
declare const DEFAULT_CONTENT_TYPE = "application/json";
declare const DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
declare const DEFAULT_FRAME_OPTIONS = "DENY";
declare const DEFAULT_CONTENT_TYPE_OPTIONS = "nosniff";
declare const DEFAULT_PERMISSIONS_POLICY = "camera=(), microphone=(), geolocation=()";

declare class SecurityFramework {
    constructor(config?: SecurityConfig);
    readonly csrf: {
        generateToken: typeof generateCsrfToken;
        validateToken: typeof validateCsrfToken;
        middleware: typeof csrfMiddleware;
    };
    readonly xss: {
        sanitize: typeof sanitize;
    };
    readonly headers: {
        builder: () => SecurityHeadersBuilder;
    };
    readonly cors: {
        createHeaders: typeof createCorsHeaders;
    };
    readonly cookies: {
        parse: typeof parseCookies;
        serialize: typeof serializeCookie;
    };
    readonly proxy: {
        info: typeof getProxyInfo;
        trusted: typeof isTrustedProxy;
    };
    readonly rateLimit: {
        check: typeof rateLimit;
    };
}
declare function createSecurity(config?: SecurityConfig): SecurityFramework;

declare function banner(): void;

declare function box(title: string, width?: number): void;

declare const Colors: {
    reset: string;
};

declare function divider(char?: string, length?: number): void;

interface FooterOptions {
    framework: string;
    version: string;
    runtime?: string;
    status?: string;
}
declare function footer({ framework, version, runtime, status, }: FooterOptions): void;

declare function header(title: string): void;

declare function success(message: string): void;
declare function error(message: string): void;
declare function warning(message: string): void;
declare function info(message: string): void;
declare function pass(message: string): void;
declare function fail(message: string): void;

declare const output: {
    success: typeof success;
    error: typeof error;
    warning: typeof warning;
    info: typeof info;
};

declare function progress(current?: number, total?: number, width?: number): void;

declare function section(title: string): void;

declare class Spinner {
    private spinner;
    constructor(text?: string);
    start(): void;
    success(text?: string): void;
    fail(text?: string): void;
    warn(text?: string): void;
    info(text?: string): void;
    stop(): void;
}

declare const Symbols: {
    readonly success: "✔";
    readonly error: "✖";
    readonly warning: "⚠";
    readonly info: "ℹ";
    readonly section: "▶";
    readonly star: "★";
    readonly rocket: "🚀";
    readonly check: "✅";
};

declare function table(): void;

declare class Timer {
    private startTime;
    reset(): void;
    elapsed(): number;
}

declare function tree(title: string, items: string[]): void;

export { AVSSError, type AVSSPlugin, type AppleProvider, type AppleProviderConfig, Audit, type AuditEntry, AuditEvent, type AuditOptions, type AuditUser, type AuthAdapter, type AuthConfig, type AuthProvider, type BaseProvider, type CheckResult, type ClientInfo, Colors, type CookieConfig, type CookieMap, type CorsConfig, type CorsHeaders, type CredentialsProvider, type CredentialsProviderConfig, type CsrfConfig, type CsrfRequest, type CsrfResult, DEFAULT_CONTENT_TYPE, DEFAULT_CONTENT_TYPE_OPTIONS, DEFAULT_COOKIE_NAME, DEFAULT_CSRF_COOKIE, DEFAULT_CSRF_HEADER, DEFAULT_FRAME_OPTIONS, DEFAULT_PERMISSIONS_POLICY, DEFAULT_RATE_LIMIT, DEFAULT_RATE_WINDOW, DEFAULT_REFERRER_POLICY, DEFAULT_ROLE, DEFAULT_SECURITY_HEADERS, DEFAULT_TOKEN_LENGTH, type DiscordProvider, type DiscordProviderConfig, Doctor, type Env, ErrorCode, type ErrorResponse, EventEmitter, type EventListener, type EventMap, type EventName, type FailedLoginEvent, type FooterOptions, ForbiddenError, type GithubProvider, type GithubProviderConfig, type GitlabProvider, type GitlabProviderConfig, type GoogleProvider, type GoogleProviderConfig, type HeaderConfig, InternalServerError, Logger, type LoginEvent, type LogoutEvent, MemoryStore, type MicrosoftProvider, type MicrosoftProviderConfig, type MiddlewareResult, type MiddlewareUser, type OAuthProviderConfig, PROVIDERS, PROVIDERS_FRAMEWORK, PROVIDERS_VERSION, PROVIDER_VERSION, ProviderManager, type ProxyConfig, type ProxyHeaders, type ProxyInfo, type RateLimitConfig, type RateLimitEntry, type RateLimitResult$1 as RateLimitResult, RateLimiter, type RateLimiterOptions, type RegisterEvent, type RequestLog, Role, SECURITY_NAME, SECURITY_VERSION, type SecurityConfig, SecurityFramework, type SecurityHeaders, SecurityHeadersBuilder, type SecurityModule, type SecurityResult, type Session, SessionExpiredError, type SessionUser, Spinner, Symbols, Timer, UnauthorizedError, ValidationError, type ValidationResult, type XssConfig, audit, auditPlugin, authMiddleware, banner, box, corsMiddleware, createAdapter, createAppleProvider, createAuth, createCorsHeaders, createCredentialsProvider, createDiscordProvider, createGithubProvider, createGitlabProvider, createGoogleProvider, createMicrosoftProvider, createSecurity, csrfMiddleware, defaultCookieConfig, defaultCorsConfig, defaultCsrfConfig, defaultHeaderConfig, defaultProxyConfig, defaultRateLimitConfig, defaultXssConfig, divider, doctor, endTimer, error, errorHandler, escapeHtml, events, fail, footer, formatAudit, generateCsrfToken, generatePassword, getConfig, getProxyInfo, getRemainingTime, getSecurityConfig, guestMiddleware, hasAnyRole, hasRole, hashPassword, header, info, isAdmin, isModerator, isSessionExpired, isSuperAdmin, isTrustedProxy, isUser, logRequest, logger, loggerPlugin, needsRehash, output, parseCookies, pass, prisma, progress, providerManager, rateLimit, resetSecurityConfig, roleMiddleware, rotateLogs, sanitize, section, serializeCookie, setConfig, setSecurityConfig, showBanner, startTimer, success, table, tree, validate, validateCsrfToken, validateEnv, validateOrThrow, verifyPassword, warning };
