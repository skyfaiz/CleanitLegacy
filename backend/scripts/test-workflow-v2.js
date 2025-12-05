/**
 * Production Workflow V2 Test Suite
 * Tests the complete lifecycle: Campaign → Contribution → Job → Claim → Complete → Verify
 * 
 * Usage: node scripts/test-workflow-v2.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

let testUsers = {};
let testCampaign = null;
let testJob = null;

const colors = {
    reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m', 
    yellow: '\x1b[33m', blue: '\x1b[34m', cyan: '\x1b[36m'
};

function log(msg, color = 'reset') { console.log(`${colors[color]}${msg}${colors.reset}`); }
function logSection(title) { console.log('\n' + '='.repeat(50)); log(`  ${title}`, 'cyan'); console.log('='.repeat(50)); }
function logTest(name, passed, details = '') {
    const status = passed ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`;
    console.log(`  ${status} ${name}${details ? ` - ${details}` : ''}`);
    return passed;
}

async function apiRequest(method, endpoint, data = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const options = { method, headers };
    if (data && method !== 'GET') options.body = JSON.stringify(data);
    
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const responseData = await response.json().catch(() => ({}));
        return { status: response.status, ok: response.ok, data: responseData };
    } catch (error) {
        return { status: 0, ok: false, data: { error: error.message } };
    }
}

function generateToken(user) {
    return jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

async function setupTestUsers() {
    logSection('SETUP: Creating Test Users');
    const hashedPassword = await bcrypt.hash('Test123!', 10);
    const ts = Date.now();

    try {
        testUsers.citizen = await prisma.user.create({
            data: { email: `citizen_${ts}@test.com`, password: hashedPassword, name: 'Test Citizen', role: 'CITIZEN' }
        });
        testUsers.citizenToken = generateToken(testUsers.citizen);
        logTest('Created CITIZEN', true, testUsers.citizen.email);

        testUsers.cleaner = await prisma.user.create({
            data: { email: `cleaner_${ts}@test.com`, password: hashedPassword, name: 'Test Cleaner', role: 'CLEANER' }
        });
        testUsers.cleanerToken = generateToken(testUsers.cleaner);
        logTest('Created CLEANER', true, testUsers.cleaner.email);

        await prisma.cleanerProfile.create({ data: { userId: testUsers.cleaner.id, rating: 5.0 } });
        logTest('Created CleanerProfile', true);

        testUsers.admin = await prisma.user.create({
            data: { email: `admin_${ts}@test.com`, password: hashedPassword, name: 'Test Admin', role: 'ADMIN' }
        });
        testUsers.adminToken = generateToken(testUsers.admin);
        logTest('Created ADMIN', true, testUsers.admin.email);
        return true;
    } catch (error) {
        logTest('Setup users', false, error.message);
        return false;
    }
}

async function testCampaignCreation() {
    logSection('TEST: Campaign Creation');
    let passed = 0, total = 0;

    total++;
    try {
        testCampaign = await prisma.campaign.create({
            data: {
                title: 'Test Cleanup Campaign V2',
                description: 'This is a test campaign to verify the production workflow implementation with proper validation.',
                location: 'Test Location, Bangalore',
                targetAmount: 1000,
                imageUrl: 'test-image.jpg',
                creatorId: testUsers.citizen.id,
                status: 'ACTIVE',
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });
        passed += logTest('Create campaign', true, `ID: ${testCampaign.id}`) ? 1 : 0;
    } catch (error) {
        logTest('Create campaign', false, error.message);
    }

    total++;
    passed += logTest('Campaign has expiration', testCampaign?.expiresAt != null) ? 1 : 0;

    total++;
    const getRes = await apiRequest('GET', `/campaigns/${testCampaign?.id}`);
    passed += logTest('Get campaign via API', getRes.ok) ? 1 : 0;

    log(`\nCampaign Tests: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

async function testContributionFlow() {
    logSection('TEST: Contribution & Funding');
    let passed = 0, total = 0;

    total++;
    try {
        await prisma.contribution.create({
            data: {
                userId: testUsers.citizen.id, campaignId: testCampaign.id, amount: 1000,
                status: 'SUCCESS', razorpayOrderId: `order_${Date.now()}`, escrowStatus: 'HELD'
            }
        });
        await prisma.campaign.update({
            where: { id: testCampaign.id },
            data: { amountRaised: 1000, status: 'FUNDED' }
        });
        testCampaign = await prisma.campaign.findUnique({ where: { id: testCampaign.id } });
        passed += logTest('Campaign funded', testCampaign.status === 'FUNDED') ? 1 : 0;
    } catch (error) {
        logTest('Contribution flow', false, error.message);
    }

    log(`\nContribution Tests: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

async function testJobCreation() {
    logSection('TEST: Job Creation');
    let passed = 0, total = 0;

    total++;
    try {
        testJob = await prisma.job.create({
            data: {
                campaignId: testCampaign.id, status: 'AVAILABLE',
                amount: testCampaign.targetAmount * 0.95, platformFee: testCampaign.targetAmount * 0.05,
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            }
        });
        passed += logTest('Create job', true, `Amount: ₹${testJob.amount}`) ? 1 : 0;
    } catch (error) {
        logTest('Create job', false, error.message);
    }

    total++;
    passed += logTest('Job is AVAILABLE', testJob?.status === 'AVAILABLE') ? 1 : 0;

    log(`\nJob Creation Tests: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

async function testJobClaiming() {
    logSection('TEST: Job Claiming');
    let passed = 0, total = 0;

    total++;
    const claimRes = await apiRequest('POST', `/jobs/${testJob.id}/claim`, {}, testUsers.cleanerToken);
    passed += logTest('Claim job via API', claimRes.ok, claimRes.data.error || '') ? 1 : 0;

    total++;
    testJob = await prisma.job.findUnique({ where: { id: testJob.id } });
    passed += logTest('Job status is CLAIMED', testJob?.status === 'CLAIMED') ? 1 : 0;

    total++;
    passed += logTest('Cleaner assigned', testJob?.cleanerId === testUsers.cleaner.id) ? 1 : 0;

    total++;
    passed += logTest('Deadline set', testJob?.completionDeadline != null) ? 1 : 0;

    total++;
    const doubleClaim = await apiRequest('POST', `/jobs/${testJob.id}/claim`, {}, testUsers.cleanerToken);
    passed += logTest('Cannot double-claim', !doubleClaim.ok) ? 1 : 0;

    log(`\nJob Claiming Tests: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

async function testJobCompletion() {
    logSection('TEST: Job Completion');
    let passed = 0, total = 0;

    total++;
    try {
        testJob = await prisma.job.update({
            where: { id: testJob.id },
            data: { status: 'COMPLETED', completionImageUrl: 'test-complete.jpg', completedAt: new Date() }
        });
        passed += logTest('Complete job', testJob.status === 'COMPLETED') ? 1 : 0;
    } catch (error) {
        logTest('Complete job', false, error.message);
    }

    log(`\nJob Completion Tests: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

async function testAdminVerification() {
    logSection('TEST: Admin Verification');
    let passed = 0, total = 0;

    total++;
    const queueRes = await apiRequest('GET', '/admin/jobs/verification-queue', null, testUsers.adminToken);
    passed += logTest('Get verification queue', queueRes.ok) ? 1 : 0;

    total++;
    const verifyRes = await apiRequest('POST', `/admin/jobs/${testJob.id}/verify`, { notes: 'Test' }, testUsers.adminToken);
    passed += logTest('Verify job', verifyRes.ok, verifyRes.data.error || '') ? 1 : 0;

    total++;
    testJob = await prisma.job.findUnique({ where: { id: testJob.id } });
    passed += logTest('Job is VERIFIED', testJob?.status === 'VERIFIED') ? 1 : 0;

    total++;
    const payout = await prisma.payout.findFirst({ where: { jobId: testJob.id } });
    passed += logTest('Payout record created', payout != null) ? 1 : 0;

    log(`\nAdmin Verification Tests: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

async function testNotifications() {
    logSection('TEST: Notifications');
    let passed = 0, total = 0;

    total++;
    try {
        await prisma.notification.create({
            data: { userId: testUsers.cleaner.id, type: 'JOB_VERIFIED', title: 'Job Verified!', message: 'Payment coming soon.' }
        });
        passed += logTest('Create notification', true) ? 1 : 0;
    } catch (error) {
        logTest('Create notification', false, error.message);
    }

    total++;
    const getRes = await apiRequest('GET', '/notifications', null, testUsers.cleanerToken);
    passed += logTest('Get notifications API', getRes.ok) ? 1 : 0;

    total++;
    const countRes = await apiRequest('GET', '/notifications/unread-count', null, testUsers.cleanerToken);
    passed += logTest('Get unread count', countRes.ok) ? 1 : 0;

    log(`\nNotification Tests: ${passed}/${total}`, passed === total ? 'green' : 'red');
    return passed === total;
}

async function cleanup() {
    logSection('CLEANUP');
    try {
        const userIds = [testUsers.citizen?.id, testUsers.cleaner?.id, testUsers.admin?.id].filter(Boolean);
        await prisma.activityLog.deleteMany({ where: { userId: { in: userIds } } });
        await prisma.notification.deleteMany({ where: { userId: { in: userIds } } });
        if (testJob) {
            await prisma.payout.deleteMany({ where: { jobId: testJob.id } });
            await prisma.job.delete({ where: { id: testJob.id } });
        }
        if (testCampaign) {
            await prisma.escrowTransaction.deleteMany({ where: { contribution: { campaignId: testCampaign.id } } });
            await prisma.contribution.deleteMany({ where: { campaignId: testCampaign.id } });
            await prisma.campaign.delete({ where: { id: testCampaign.id } });
        }
        if (testUsers.cleaner) await prisma.cleanerProfile.deleteMany({ where: { userId: testUsers.cleaner.id } });
        await prisma.user.deleteMany({ where: { id: { in: userIds } } });
        log('  Cleanup completed', 'green');
    } catch (error) {
        log(`  Cleanup error: ${error.message}`, 'red');
    }
}

async function runTests() {
    log('\n╔════════════════════════════════════════════════╗', 'cyan');
    log('║   CLEANIT V2 WORKFLOW TEST SUITE               ║', 'cyan');
    log('╚════════════════════════════════════════════════╝', 'cyan');

    const results = {};
    try {
        results.setup = await setupTestUsers();
        if (!results.setup) throw new Error('Setup failed');
        
        results.campaign = await testCampaignCreation();
        results.contribution = await testContributionFlow();
        results.jobCreation = await testJobCreation();
        results.jobClaiming = await testJobClaiming();
        results.jobCompletion = await testJobCompletion();
        results.adminVerification = await testAdminVerification();
        results.notifications = await testNotifications();
    } catch (error) {
        log(`\nFatal: ${error.message}`, 'red');
    }

    logSection('SUMMARY');
    const total = Object.keys(results).length;
    const passed = Object.values(results).filter(Boolean).length;
    Object.entries(results).forEach(([name, ok]) => {
        console.log(`  ${ok ? colors.green + '✓' : colors.red + '✗'}${colors.reset} ${name}`);
    });
    log(`\n  Total: ${passed}/${total} suites passed`, passed === total ? 'green' : 'red');

    await cleanup();
    await prisma.$disconnect();
    process.exit(passed === total ? 0 : 1);
}

runTests().catch(console.error);
